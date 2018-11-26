# -*- coding: utf-8 -*-
import pickle
import argparse
from collections import defaultdict
import csv
import os

def open_pickle_file(file_path):
    with open(file_path, 'rb') as f:
        trials_object = pickle.load(f)
        
    return trials_object
    
    

    
if __name__ == '__main__':
    
    parser = argparse.ArgumentParser(description='Opens trials pickle file')
    parser.add_argument('-i', '--input', default=1, required=True, help='[Required] Trials file')
    parser.add_argument('-m', '--method', default=1, required=True, help='[Required] NN used to generate trials file')
    
    #pega os argumentos passados
    args = parser.parse_args()
    
    trials = open_pickle_file(args.input)
    
    """pega o tipo de rede em que as tentativas foram feitas. Para cada rede
    existe um conjunto diferente de parâmetros.
    """
    
    if args.method == 'mlp':
        keys = ["units1", "lr", "activation","init", "opt", "reg", "lr_reg"]
        hyperparametros = dict.fromkeys(keys, None)
        print("baaa")
        hyperparametros["units1"]= [64, 512]
        hyperparametros["lr"] = [0.01, 0.001, 0.0001]
        hyperparametros["activation"] = ['relu', 'linear']
        hyperparametros["init"] = ['random_normal', 'random_uniform']
        hyperparametros["opt"] = ['SGD','Adam','Adamgrad','RMSprop']
        hyperparametros["reg"] = ['l1','l2','l1l2']
        hyperparametros["l1"] = [0.00001, 0.0001, 0.001, 0.01]
        hyperparametros["l2"] = [0.00001, 0.0001, 0.001, 0.01]
        hyperparametros["l1l2"] = [0.00001, 0.0001, 0.001, 0.01]
        hyperparametros["lr_reg"] = [0.00001, 0.0001, 0.001, 0.01]


    elif args.method == 'dmlp':
        keys = ["units1", "lr", "activation" , "dropout", "init", "opt", "reg", "lr_reg", "n_layers"]
        hyperparametros = dict.fromkeys(keys, None)
        hyperparametros["units1"] = [32,64, 128]
        hyperparametros["lr"] = [0.01, 0.001, 0.0001]
        hyperparametros["dropout"] = [0, 0.1, 0.3, 0.5, 0.7]
        hyperparametros["activation"] = ['relu', 'linear']
        hyperparametros["init"] = ['random_normal', 'random_uniform']
        hyperparametros["opt"] = ['SGD','Adam','Adamgrad','RMSprop']
        hyperparametros["reg"] = ['l1','l2','l1l2']
        hyperparametros["l1"] = [0.00001, 0.0001, 0.001, 0.01]
        hyperparametros["l2"] = [0.00001, 0.0001, 0.001, 0.01]
        hyperparametros["l1l2"] = [0.00001, 0.0001, 0.001, 0.01]
        hyperparametros["lr_reg"] = [0.00001, 0.0001, 0.001, 0.01]
        hyperparametros["n_layers"] = [1,2,4]  

    """Lê o arquivo de tentativa de entrada e obtem os valores para salvar em 
    .csv 
    Os valores que nos interessa é:
    1) ordem da tentativa - iniciando em 0-T, onde T é o número total de tentativas
    2) A loss, que é 100 - a média da métrica macro F1 (tirada do processo de cross-validação com 5 folds).
    3) os valores dos parâmetros utilizados na tentativa N 
    """
    modelo = {}
    print(trials)
    for trials in trials.trials:
        params = {}
        for parameter, value in trials['misc']['vals'].items():
            if value != []:
                params[parameter] = hyperparametros[parameter][value[0]]
        params['loss'] = round(trials['result']['loss'],4)
        params['time'] = trials['book_time']   
        modelo[trials['tid']] = params
        modelo[trials['tid']]

    """ gera a saida com os atributos que nos interessa em .csv
    """ 

    with open("saida/"+args.method+"_"+os.path.splitext(os.path.basename(args.input))[0]+'_data.csv', 'w') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(["tentativa", [list(v.keys()) for k, v in modelo.items() ][0]])
        for key, value in modelo.items():
            writer.writerow([key,list(value.values())])
            
