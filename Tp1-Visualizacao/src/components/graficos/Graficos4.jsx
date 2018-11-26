import React from 'react';
import { FormControl, InputLabel, Select, Input, MenuItem, FormHelperText, Card, CardContent, CardHeader, Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import LineChart from '../LineChart/LineChart';
import { parse } from 'papaparse';
import dmlp_data1 from "../../files/dmlp_4uni_mf/dmlp_data1.csv";
import dmlp_data2 from "../../files/dmlp_4uni_mf/dmlp_data2.csv";
import dmlp_data3 from "../../files/dmlp_4uni_mf/dmlp_data3.csv";
import dmlp_data4 from "../../files/dmlp_4uni_mf/dmlp_data4.csv";
import dmlp_data5 from "../../files/dmlp_4uni_mf/dmlp_data5.csv";
import { mapCsv } from '../ui/utils/Functions';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
});


class Graficos4 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 0, height: 0,
      ordata: [],
      data: [],
      values: [],
      units: 'T',
      lr: 'T',
      act: 'T',
      init: 'T',
      opt: 'T',
      reg: 'T',
      lr_reg: 'T',
      layers: 'T',
      dropout: 'T',
      fold: 'T',
    };
    this.loadCsv();
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  loadCsv = () => {
    parse(dmlp_data1, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        this.state.ordata.push({
          name: "FOLD1",
          values: mapCsv(results.data)
        });
        this.state.values.push(...mapCsv(results.data));
        this.forceUpdate();
      }
    });
    parse(dmlp_data2, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        this.state.ordata.push({
          name: "FOLD2",
          values: mapCsv(results.data)
        });
        this.state.values.push(...mapCsv(results.data));
        this.forceUpdate();
      }
    });
    parse(dmlp_data3, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        this.state.ordata.push({
          name: "FOLD3",
          values: mapCsv(results.data)
        });
        this.state.values.push(...mapCsv(results.data));
        this.forceUpdate();
      }
    });
    parse(dmlp_data4, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        this.state.ordata.push({
          name: "FOLD4",
          values: mapCsv(results.data)
        });
        this.state.values.push(...mapCsv(results.data));
        this.forceUpdate();
      }
    });
    parse(dmlp_data5, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        this.state.ordata.push({
          name: "FOLD5",
          values: mapCsv(results.data)
        });
        this.state.values.push(...mapCsv(results.data));
        this.forceUpdate();
      }
    });
    this.updateGraph();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    this.updateGraph();
  }


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.updateGraph();
  };

  updateGraph = () => {
    let data = this.state.ordata;
    const { units, lr, act, init, opt, reg, lr_reg, layers, dropout, fold } = this.state;
    if (units !== 'T') {
      data = data.map(d => ({
        name: d.name,
        values: d.values.filter(v => v.units === parseFloat(units)),
      }))
    }
    if (lr !== 'T') {
      data = data.map(d => ({
        name: d.name,
        values: d.values.filter(v => v.lr === parseFloat(lr)),
      }));
    }
    if (act !== 'T') {
      data = data.map(d => ({
        name: d.name,
        values: d.values.filter(v => v.act === parseFloat(act)),
      }));
    }
    if (init !== 'T') {
      data = data.map(d => ({
        name: d.name,
        values: d.values.filter(v => v.init === init),
      }));
    }
    if (opt !== 'T') {
      data = data.map(d => ({
        name: d.name,
        values: d.values.filter(v => v.opt === opt),
      }));
    }
    if (reg !== 'T') {
      data = data.map(d => ({
        name: d.name,
        values: d.values.filter(v => v.reg === reg),
      }));
    }
    if (lr_reg !== 'T') {
      data = data.map(d => ({
        name: d.name,
        values: d.values.filter(v => v.lr_reg === parseFloat(lr_reg)),
      }));
    }
    if (layers !== 'T') {
      data = data.map(d => ({
        name: d.name,
        values: d.values.filter(v => v.layers === parseFloat(layers)),
      }));
    }
    if (dropout !== 'T') {
      data = data.map(d => ({
        name: d.name,
        values: d.values.filter(v => v.dropout === parseFloat(dropout)),
      }));
    }
    if (fold !== 'T') {
      data = data.filter(d => d.name === fold);
    }
    this.setState({ data });
  }

  render() {
    const { data, values } = this.state;
    const { classes } = this.props;
    return (<Card>
      <CardHeader
        title="DMLP 4UNI MF"
        subheader="Escolha os parametros para ver alterações no grafico"
      />
      <CardContent>
        <div className={classes.root} >
          <FormControl className={classes.formControl}>
            <InputLabel>fold</InputLabel>
            <Select
              value={this.state.fold}
              onChange={this.handleChange}
              input={<Input name="fold" id="fold-helper" />}
            >
              <MenuItem value="T">Todos</MenuItem>
              {values && [...new Set(data.map(v => v.name))].map((v, i) => <MenuItem key={i} value={`${v}`}>{`${v}`}</MenuItem>)}
            </Select>
            <FormHelperText>Escolha o valor do parametro</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>units</InputLabel>
            <Select
              value={this.state.units}
              onChange={this.handleChange}
              input={<Input name="units" id="units-helper" />}
            >
              <MenuItem value="T">Todos</MenuItem>
              {values && [...new Set(values.map(v => v.units))].map((v, i) => <MenuItem key={i} value={`${v}`}>{`${v}`}</MenuItem>)}
            </Select>
            <FormHelperText>Escolha o valor do parametro</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>lr</InputLabel>
            <Select
              value={this.state.lr}
              onChange={this.handleChange}
              input={<Input name="lr" id="lr-helper" />}
            >
              <MenuItem value="T">Todos</MenuItem>
              {values && [...new Set(values.map(v => v.lr))].map((v, i) => <MenuItem key={i} value={`${v}`}>{`${v}`}</MenuItem>)}
            </Select>
            <FormHelperText>Escolha o valor do parametro</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>act</InputLabel>
            <Select
              value={this.state.act}
              onChange={this.handleChange}
              input={<Input name="act" id="act-helper" />}
            >
              <MenuItem value="T">Todos</MenuItem>
              {values && [...new Set(values.map(v => v.act))].map((v, i) => <MenuItem key={i} value={`${v}`}>{`${v}`}</MenuItem>)}
            </Select>
            <FormHelperText>Escolha o valor do parametro</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>init</InputLabel>
            <Select
              value={this.state.init}
              onChange={this.handleChange}
              input={<Input name="init" id="init-helper" />}
            >
              <MenuItem value="T">Todos</MenuItem>
              {values && [...new Set(values.map(v => v.init))].map((v, i) => <MenuItem key={i} value={`${v}`}>{`${v}`}</MenuItem>)}
            </Select>
            <FormHelperText>Escolha o valor do parametro</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>opt</InputLabel>
            <Select
              value={this.state.opt}
              onChange={this.handleChange}
              input={<Input name="opt" id="opt-helper" />}
            >
              <MenuItem value="T">Todos</MenuItem>
              {values && [...new Set(values.map(v => v.opt))].map((v, i) => <MenuItem key={i} value={`${v}`}>{`${v}`}</MenuItem>)}
            </Select>
            <FormHelperText>Escolha o valor do parametro</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>reg</InputLabel>
            <Select
              value={this.state.reg}
              onChange={this.handleChange}
              input={<Input name="reg" id="reg-helper" />}
            >
              <MenuItem value="T">Todos</MenuItem>
              {values && [...new Set(values.map(v => v.reg))].map((v, i) => <MenuItem key={i} value={`${v}`}>{`${v}`}</MenuItem>)}
            </Select>
            <FormHelperText>Escolha o valor do parametro</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>lr_reg</InputLabel>
            <Select
              value={this.state.lr_reg}
              onChange={this.handleChange}
              input={<Input name="lr_reg" id="lr_reg-helper" />}
            >
              <MenuItem value="T">Todos</MenuItem>
              {values && [...new Set(values.map(v => v.lr_reg))].map((v, i) => <MenuItem key={i} value={`${v}`}>{`${v}`}</MenuItem>)}
            </Select>
            <FormHelperText>Escolha o valor do parametro</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>layers</InputLabel>
            <Select
              value={this.state.layers}
              onChange={this.handleChange}
              input={<Input name="layers" id="layers-helper" />}
            >
              <MenuItem value="T">Todos</MenuItem>
              {values && [...new Set(values.map(v => v.layers))].map((v, i) => <MenuItem key={i} value={`${v}`}>{`${v}`}</MenuItem>)}
            </Select>
            <FormHelperText>Escolha o valor do parametro</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>dropout</InputLabel>
            <Select
              value={this.state.dropout}
              onChange={this.handleChange}
              input={<Input name="dropout" id="dropout-helper" />}
            >
              <MenuItem value="T">Todos</MenuItem>
              {values && [...new Set(values.map(v => v.dropout))].map((v, i) => <MenuItem key={i} value={`${v}`}>{`${v}`}</MenuItem>)}
            </Select>
            <FormHelperText>Escolha o valor do parametro</FormHelperText>
          </FormControl>

          <div style={{
            marginBottom: 'auto', marginTop: 'auto',
          }}>
            <Button variant="raised" color="primary" onClick={this.updateGraph}>
              Atualizar
          </Button>
          </div>
        </div>
        <div className={classes.root} >
          {data && data.length > 0 &&
            <LineChart
              data={data}
              width={this.state.width - 70}
              height={450}
              title="Taxa de perca por tentativa"
              source=""
              xLabel="Tentativas"
              yLabel="Taxa de erro"
            />
          }
        </div>
      </CardContent>
    </Card >);
  }
};

export default withStyles(styles, { withTheme: true })(Graficos4);
