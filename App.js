import React, { Component } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animais: [
        {
          id: 1,
          nome: "Micalatéia",
          imagem: {
            uri: "https://i.pinimg.com/736x/a1/41/c1/a141c1edd98ae325415c5a4cb0ffb547.jpg",
          },
          descricao: `🐾 Muito dócil, gosta de crianças, se dá bem com gatos e outros animais! Ela pede carinho com a patinha e ama carinho na barriga.
⚠️ Adoção mediante assinatura de TERMO DE RESPONSABILIDADE.`,
          detalhes: "Vacina? Sim! \nVermífugo? Sim! \nLocalização: Octogonal. \nIdade: 1 ano. \nRaça: sem raça definida. \nCastrada? Não. \nPorte pequeno, esperando por um lar acolhedor. \nQue tal dar essa chance única a ele?",
        },
        {
          id: 2,
          nome: "Bianca",
          imagem: {
            uri: "https://i.pinimg.com/736x/b5/a5/e4/b5a5e40fbe7846ba3290c49dff08a125.jpg",
          },
          descricao: `🐾 Super amorosa e adorável!
⚠️ Adoção mediante assinatura de TERMO DE RESPONSABILIDADE.`,
          detalhes: "Vacina? Sim! \nVermífugo? Sim! \nLocalização: Ponte Alta. \nIdade: dois meses. \nRaça: sem raça definida. \nCastrada? Sim! \nFilhote saudável e pronto para adoção. \nQue tal dar um lar amoroso?",
        },
        {
          id: 3,
          nome: "Ron",
          imagem: {
            uri: "https://i.pinimg.com/736x/df/14/c5/df14c574d2517a056fe10c1f53ac1875.jpg",
          },
          descricao: `🐈 Se dá bem com todo mundo, extremamente carinhoso e carente. Adora carinho no pescoço e cabeça.
⚠️ Adoção mediante assinatura de TERMO DE RESPONSABILIDADE.`,
          detalhes: "Vacina: sim, faltando apenas a múltipla. \nVermífugo: sim. \nLocalização: Lago Norte. \nIdade: 2 anos. \nRaça: sem raça definida. \nCastrada: não. \nPrecisa de cuidados e atenção para ser castrada.",
        },
        {
          id: 4,
          nome: "Salvador",
          imagem: {
            uri: "https://i.pinimg.com/736x/7a/fc/40/7afc4012cdddd2cfececb8d66683ec36.jpg",
          },
          descricao: `🐤 Irritadinho, não se dá muito bem com animais de outras espécies, mas gosta de humanos. Gosta de um carinho ou outro na cabeça, mas prefere ficar no próprio canto. 
          ⚠️ Adoção mediante assinatura de TERMO DE RESPONSABILIDADE.`,
          detalhes: "Vacina: sim. \nVermífugo: sim. \nLocalização: Candangolândia. \nIdade: 1 mês. \nRaça: calopsita. \nCastrada: não. \nAsas cortadas: sim. \nEstá saudável, mas precisa de cuidados especiais devido às asas cortadas."
        },
        {
          id: 5,
          nome: "Rogério",
          imagem: {
            uri: "https://i.pinimg.com/736x/65/45/09/654509a9f6c01b391f27e19096e20ba0.jpg",
          },
          descricao: `🐾 Idosinho super saudável, muito companheiro, adora passear e correr atrás de pássaros. Ama descansar perto dos humanos. 
          ⚠️ Adoção mediante assinatura de TERMO DE RESPONSABILIDADE.`,
          detalhes: "Vacina: sim, todas em dia. \nVermífugo: sim. \nLocalização: Planaltina. \nIdade: 9 anos. \nRaça: sem raça definida. \nCastrado: sim. \nEstá bem cuidado e com todas as necessidades atendidas."
        }
      ],
      animalSelecionado: null, // Armazena o ID do animal clicado
    };
  }

  handlePress(animalId) {
    this.setState({
      animalSelecionado: this.state.animalSelecionado === animalId ? null : animalId, // Alterna entre mostrar e esconder detalhes
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
            textAlign: "center",
            marginBottom: 15,
          }}
        >
          Não compre, adote!
        </Text>

        {this.state.animais.map((animal) => (
          <TouchableOpacity
            key={animal.id}
            style={{
              marginVertical: 10,
              borderRadius: 10,
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 5,
            }}
            onPress={() => this.handlePress(animal.id)} // Quando clicado, alterna os detalhes do animal
          >
            <View style={{ alignItems: "center", marginBottom: 10 }}>
              <Image
                source={animal.imagem}
                style={{ width: 300, height: 500, borderRadius: 10, marginTop: 20 }}
              />
              <Text
                style={{
                  fontSize: 24,
                  color: "#006400",
                  textAlign: "center",
                  marginVertical: 10,
                }}
              >
                {animal.nome}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#fff",
                padding: 20,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Roboto",
                  textAlign: "center",
                  lineHeight: 24,
                  width: 300,
                }}
              >
                {animal.descricao}
              </Text>

              {/* Mostra detalhes adicionais se o animal estiver selecionado */}
              {this.state.animalSelecionado === animal.id && (
                <View
                  style={{
                    marginTop: 10,
                    padding: 10,
                    backgroundColor: "#e6ffe6",
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#006400",
                      fontFamily: "Roboto",
                      textAlign: "center",
                    }}
                  >
                    {animal.detalhes}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

export default App;
