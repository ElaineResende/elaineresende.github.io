import React from "react";
import BarChart from "../BarChart/BarChart";
import { FormControl, InputLabel, Select, Input, MenuItem, FormHelperText, Card, CardContent, CardHeader, Grid, Typography, Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import eleicoes from "../../files/eleicoes_2014.json";

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

class Graficos2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uf: "T",
      turno: "1",
      data: [],
      key: 1,
      tipo: "1",
      ordem: "1",
      cargo: "T",
      width: 0, height: 0
    };
    this.updateGraph();

  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
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
    const uniqueKeys = [...new Set(eleicoes.map(item => item.cat_party))];

    let ele = eleicoes
      .filter(e => e.num_turn === this.state.turno);

    if (this.state.uf !== 'T') {
      ele = ele.filter(e => e.cat_state === this.state.uf);
    }
    if (this.state.cargo !== 'T') {
      ele = ele.filter(e => e.cat_political_office === this.state.cargo);
    }

    const dt = uniqueKeys.map(u => ({
      description: u,
      value: ele.filter(e => e.cat_party === u).length,
    })).filter(v => v.value !== 0);

    const valTotal = dt.reduce((pv, v) => pv + v.value, 0);

    const maisVotado = (o1, o2) => o2.value - o1.value;
    const alfabetica = (o1, o2) => o2.description - o1.description;

    const dataGraph = dt.map(p => ({
      description: p.description,
      absValue: p.value,
      value: ((parseInt(p.value, 10) / parseInt(valTotal, 10)) * 100).toFixed(2),
    })).sort(this.state.ordem === "1" ? maisVotado : alfabetica);

    this.setState({
      data: dataGraph,
      key: this.state.key + 1,
    });
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;
    const cargo = [...new Set(eleicoes.map(item => item.cat_political_office))];
    return (
      <Card>
        <CardHeader
          title="Porcentagem de partidos mais votados"
          subheader="Escolha o turno e estado para que o gráfico seja exibido"
        />
        <CardContent>
          <div className={classes.root} >
            <FormControl className={classes.formControl}>
              <InputLabel>Ordenação</InputLabel>
              <Select
                value={this.state.ordem}
                onChange={this.handleChange}
                input={<Input name="ordem" id="ordem-helper" />}
              >
                <MenuItem value="1">Mais votado</MenuItem>
                <MenuItem value="2">Alfabetica</MenuItem>
              </Select>
              <FormHelperText>Escolha o tipo de ordenação</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Turno</InputLabel>
              <Select
                value={this.state.turno}
                onChange={this.handleChange}
                input={<Input name="turno" id="turno-helper" />}
              >
                <MenuItem value="1">1o turno</MenuItem>
                <MenuItem value="2">2o turno</MenuItem>
              </Select>
              <FormHelperText>Escolha o turno</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Estado</InputLabel>
              <Select
                value={this.state.uf}
                onChange={this.handleChange}
                input={<Input name="uf" id="uf-helper" />}
              >
                <MenuItem value="T">Todos</MenuItem>
                <MenuItem value="AC">Acre</MenuItem>
                <MenuItem value="AL">Alagoas</MenuItem>
                <MenuItem value="AP">Amapá</MenuItem>
                <MenuItem value="AM">Amazonas</MenuItem>
                <MenuItem value="BA">Bahia</MenuItem>
                <MenuItem value="CE">Ceará</MenuItem>
                <MenuItem value="DF">Distrito Federal</MenuItem>
                <MenuItem value="ES">Espírito Santo</MenuItem>
                <MenuItem value="GO">Goiás</MenuItem>
                <MenuItem value="MA">Maranhão</MenuItem>
                <MenuItem value="MT">Mato Grosso</MenuItem>
                <MenuItem value="MS">Mato Grosso do Sul</MenuItem>
                <MenuItem value="MG">Minas Gerais</MenuItem>
                <MenuItem value="PA">Pará</MenuItem>
                <MenuItem value="PB">Paraíba</MenuItem>
                <MenuItem value="PR">Paraná</MenuItem>
                <MenuItem value="PE">Pernambuco</MenuItem>
                <MenuItem value="PI">Piauí</MenuItem>
                <MenuItem value="RJ">Rio de Janeiro</MenuItem>
                <MenuItem value="RN">Rio Grande do Norte</MenuItem>
                <MenuItem value="RS">Rio Grande do Sul</MenuItem>
                <MenuItem value="RO">Rondônia</MenuItem>
                <MenuItem value="RR">Roraima</MenuItem>
                <MenuItem value="SC">Santa Catarina</MenuItem>
                <MenuItem value="SP">São Paulo</MenuItem>
                <MenuItem value="SE">Sergipe</MenuItem>
                <MenuItem value="TO">Tocantins</MenuItem>
              </Select>
              <FormHelperText>Escolha o estado</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Cargo</InputLabel>
              <Select
                value={this.state.cargo}
                onChange={this.handleChange}
                input={<Input name="cargo" id="cargo-helper" />}
              >
                <MenuItem value="T">Todos</MenuItem>
                {cargo.map(c => <MenuItem value={c}>{c}</MenuItem>)}
              </Select>
              <FormHelperText>Escolha o cargo</FormHelperText>
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
              <BarChart
                width={this.state.width - 70}
                height={450}
                key={this.state.key}
                title={`Porcentagem de partidos mais votados em ${this.state.uf === 'T' ? 'Brasil' : this.state.uf}`}
                source="Source: IBGE, 2014"
                xLabel="Partidos"
                yLabel="Porcentagem de partidos"
                data={data}
                ceil={2}
              />
            }

            {data && data.length > 0 &&
              <Grid container spacing={16} justify="center" >
                {
                  data.map(d =>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="headline" component="h2">
                        {d.description}
                      </Typography>
                      <Typography color="textSecondary">
                        {`${d.value}% - quantidade: ${(d.absValue).toLocaleString('pt-BR')}`}
                      </Typography>
                    </Grid>
                  )
                }
              </Grid>
            }

          </div>
        </CardContent>
      </Card >);
  }
}

export default withStyles(styles, { withTheme: true })(Graficos2);
