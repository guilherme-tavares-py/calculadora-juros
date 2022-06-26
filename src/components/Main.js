import React from 'react'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valorInicial: '',
            valorMensal: '',
            taxa: '',
            tipoTaxa: "anual",
            periodo: '',
            tipoPeriodo: "anos",
            resultado: '',
            investido: '',
            juros: ''

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }
    handleSubmit(event) {
        let montanteInicial = parseFloat(this.state.valorInicial)
        let montanteMensal = parseFloat(this.state.valorMensal)
        let taxaCalc = (1+parseFloat(this.state.taxa/100))**(1/12)-1
        let periodoCalc = parseFloat(this.state.periodo) * 12
        let montanteTotal = montanteInicial*(1+taxaCalc)**periodoCalc + (montanteMensal*((1+taxaCalc)**periodoCalc-1))/taxaCalc
        let totalInvestido = montanteInicial
        for(let i = 0; i < periodoCalc; i += 1) {
            totalInvestido += parseFloat(montanteMensal)
        }
        this.setState({
            resultado: montanteTotal.toFixed(2),
            investido: totalInvestido.toFixed(2),
            juros: (montanteTotal - totalInvestido).toFixed(2)
        })
        event.preventDefault();
    }
    render(){
        return(

            <main>
                <div id="user-input">
                    <h1>Calculadora de Juros Compostos</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label id="valorInicial">Valor Inicial:</label>
                        <input name="valorInicial" id="valorInicial" type="number" value={this.state.valorInicial} onChange={this.handleInputChange} placeholder="0,00"/>
            
                        <label id="valorMensal">Valor Mensal:</label>
                        <input name="valorMensal" id="valorMensal" type="number" value={this.state.valorMensal} onChange={this.handleInputChange} placeholder="0,00"/>
            
                        <label id="taxa">Taxa:</label>
                        <input name="taxa" id="taxa" type="number" value={this.state.taxa} onChange={this.handleInputChange} placeholder="0,00"/>
            
                        <select name="tipoTaxa" value={this.state.tipoTaxa} onChange={this.handleInputChange}>
                            <option value="anual">Anual</option>
                            <option value="mensal">Mensal</option>
                        </select>
            
                        <label id="periodo">Período:</label>
                        <input name="periodo" id="periodo" type="number" value={this.state.periodo} onChange={this.handleInputChange} placeholder="0,00"/>

                        <select name="tipoPeriodo" value={this.state.tipoPeriodo} onChange={this.handleInputChange}>
                            <option value="anos">Anos</option>
                            <option value="meses">Meses</option>
                        </select>

                        <input id="calcular" type="submit" value="Calcular"/>
                    </form>

                </div>
                <div id="result">
                    <h1>Resultado</h1>
                    <div id="inner-result">
                        <div id="inner-inner-result">
                            <span id="result-label">Valor total final</span>
                            <span id="result-final">R$ {this.state.resultado}</span>
                        </div>
                        <div id="inner-inner-result">
                            <span id="result-label">Valor total investido</span>
                            <span id="result-investido">R$ {this.state.investido}</span>
                        </div>
                        <div id="inner-inner-result">
                            <span id="result-label">Total em Juros</span>
                            <span id="result-juros">R$ {this.state.juros}</span>
                        </div>
                    </div>
                </div>
            </main>
            
        )
    
    }
}

export default Main