import React, { Component } from "react";
import { View, Text, Image, Platform, Button} from 'react-native';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.entrar = this.entrar.bind(this);
  }
  //estrutura interna do botão
    entrar(nome) {
      this.setState({
        nome: nome
      })
    }
  render() {

    let nome = 'Mariana';

    return(
      <View>
        <Text style={{color: '#006400', fontSize: 25, margin: 10}}>
          Projeto Inicial da Aplicação</Text>
          <Text
  style={{
    fontFamily: Platform.select
    ({
      android: 'Inter_900Black',
      ios: 'Inter-Black',
    }),
  }}>
  Versão 2.0
</Text>
        <Button
        title="Entrar" onPress={() => this.entrar('Seja bem-vindo ao Appzinho')}
        />
  <Text style={{fontSize: 30, color: 'green', textAlign: 'center'}}>
    {this.state.nome}
  </Text>
        <Image
        source={{uri: 'https://inovaveterinaria.com.br/wp-content/uploads/2015/04/gato-sem-raca-INOVA-1024x683.jpg'}}
        style={{width: 300, height: 300}}
        />

        <Text style={{fontSize: 30}}>
          {nome}
        </Text>

        <Jobs largura={200} altura={200}/>
      </View>
    );
  }
}

export default App;

// Processo de Carregamento rápido da aplicação
class Jobs extends Component {
  render() {
      let img = 'https://www.petz.com.br/blog/wp-content/uploads/2020/07/raca-de-cachorro-muito-popular-no-brasil-1.jpg';

      return(
        <View>
          <Image
          source={{uri: img}}
          style={{width: this.props.largura, height: this.props.altura}}
          />
          <Text>Cachorro</Text>
        </View>
      );
  }
}