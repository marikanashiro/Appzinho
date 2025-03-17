import React, { Component } from "react";
import { View, Text, Image, Button, ScrollView } from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      botao: "",
    };
    this.entrar = this.entrar.bind(this);
  }

  entrar(botao) {
    this.setState({
      botao: botao,
    });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <Text
          style={{
            color: "#006400",
            fontSize: 40,
            marginTop: 30,
            fontFamily: "Pacifico",
            marginLeft: 30,
            marginBottom: 15,
          }}
        >
          Não compre, adote!
        </Text>

        <Button
          title="Entrar"
          onPress={() => this.entrar("Seja bem vindo a aplicação")}
        />

        <Animal
          imagem={{
            uri: "https://i.pinimg.com/736x/a1/41/c1/a141c1edd98ae325415c5a4cb0ffb547.jpg",
          }}
          nome="Micalatéia"
          descricao={`☎️ Interessados entrar em contato no WhatsApp:
Vanessa (61) 98260-4979

Flor foi abandonada em Sobradinho em Fevereiro de 2024! A Vanessa colocou uma casinha e cuidou dela na rua mesmo. No final de Outubro, quando entrou no cio, foi resgatada e está em um lar temporário desde então, aguardando por uma família amorosa e responsável.

🐶 Flor…

🐾 Fêmea
🐾 2 anos (aproximado)
🐾 Porte médio
🐾 Vermifugada
🐾 Vacinada
🐾 Castrada
🐾 Muito dócil, gosta de crianças, se dá bem com gatos e outros animais! Ela pede carinho com a patinha e ama carinho na barriga.

⚠️ Adoção mediante assinatura de TERMO DE RESPONSABILIDADE.`}
        />

        <Animal
          imagem={{
            uri: "https://i.pinimg.com/736x/b5/a5/e4/b5a5e40fbe7846ba3290c49dff08a125.jpg",
          }}
          nome="Bianca"
          descricao={`☎️ Interessados entrar em contato no WhatsApp:
Claudio (11) 98526-3029
Sandra (11) 98631-1014

Cadela fofa e amorosa, com 6 meses ❤️✨🐾

Adotem e deêm uma vida digna pra essa princesa, ela merece ser feliz.

⚠️ Adoção mediante assinatura de TERMO DE RESPONSABILIDADE.`}
        />
      </ScrollView>
    );
  }
}

class Animal extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          margin: 10,
          padding: 20,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 5,
          alignItems: "center",
        }}
      >
        <Image
          source={this.props.imagem}
          style={{ width: 300, height: 400, borderRadius: 10 }}
        />
        <Text
          style={{
            fontSize: 30,
            fontFamily: "Poppins",
            marginTop: 15,
            textAlign: "center",
          }}
        >
          {this.props.nome}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Roboto",
            marginTop: 10,
            textAlign: "justify",
            lineHeight: 24,
          }}
        >
          {this.props.descricao}
        </Text>
      </View>
    );
  }
}

export default App;
