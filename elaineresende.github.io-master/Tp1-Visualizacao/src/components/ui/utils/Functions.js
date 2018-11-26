export const mapCsv = (arr) => arr.map(d => ({
  activation: d.activation,
  dropout: d.dropout,
  init: d.init,
  value: d.loss,
  lr: d.lr,
  lr_reg: d.lr_reg,
  layers: d.n_layers,
  opt: d.opt,
  reg: d.reg,
  description: d.tentativa,
  units1: d.units1
})).filter(d => d.description !== undefined && d.description !== '' && d.description !== null);
