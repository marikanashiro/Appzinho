import React, { Component } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Picker } from "react-native";

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
          vacina: "Sim",
          vermifugo: "Sim!",
          localizacao: "Octogonal",
          idade: "1 ano",
          raca: "Sem raça definida",
          castracao: "Não.",
          porte: "Pequeno",
          especie: "Cachorro",
          detalhes: "Essa fofura está esperando por um lar acolhedor. \nQue tal dar essa chance única a ela?",
        },
        {
          id: 2,
          nome: "Bianca",
          imagem: {
            uri: "https://i.pinimg.com/736x/b5/a5/e4/b5a5e40fbe7846ba3290c49dff08a125.jpg",
          },
          descricao: `🐾 Super amorosa e adorável!
⚠️ Adoção mediante assinatura de TERMO DE RESPONSABILIDADE.`,
          vacina: "Sim!",
          vermifugo: "Sim!",
          localizacao: "Ponte Alta.",
          idade: "dois meses.",
          raca: "Sem raça definida",
          castracao: "Sim!",
          porte: "Médio.",
          especie: "Cachorro",
          detalhes: "Filhote saudável e pronto para adoção. \nQue tal dar um lar amoroso?",
        },
        {
          id: 3,
          nome: "Ron",
          imagem: {
            uri: "https://i.pinimg.com/736x/df/14/c5/df14c574d2517a056fe10c1f53ac1875.jpg",
          },
          descricao: `🐈 Se dá bem com todo mundo, extremamente carinhoso e carente. Adora carinho no pescoço e cabeça.
⚠️ Adoção mediante assinatura de TERMO DE RESPONSABILIDADE.`,
          vacina: "Sim, faltando apenas a múltipla.",
          vermifugo: "sim.",
          localizacao: "Lago Norte.",
          idade: "2 anos.",
          raca: "Sem raça definida",
          castracao: "Não",
          porte: "Pequeno.",
          especie: "Gato",
          detalhes: "Precisa de cuidados e atenção para ser castrado.",
        },
        {
          id: 4,
          nome: "Salvador",
          imagem: {
            uri: "https://i.pinimg.com/736x/7a/fc/40/7afc4012cdddd2cfececb8d66683ec36.jpg",
          },
          descricao: `🐤 Irritadinho, não se dá muito bem com animais de outras espécies, mas gosta de humanos. Gosta de um carinho ou outro na cabeça, mas prefere ficar no próprio canto. 
          ⚠️ Adoção mediante assinatura de TERMO DE RESPONSABILIDADE.`,
          vacina: "Sim.",
          vermifugo: "Sim.",
          localizacao: "Candangolândia.",
          idade: "1 mês.",
          raca: "Calopsita",
          castracao: "Não",
          porte: "Pequeno.",
          especie: "Pássaro",
          detalhes: "Asas cortadas. \nEstá saudável, mas precisa de cuidados especiais."
        },
        {
          id: 5,
          nome: "Rogério",
          imagem: {
            uri: "https://i.pinimg.com/736x/65/45/09/654509a9f6c01b391f27e19096e20ba0.jpg",
          },
          descricao: `🐾 Idosinho super saudável, muito companheiro, adora passear e correr atrás de pássaros. Ama descansar perto dos humanos. 
          ⚠️ Adoção mediante assinatura de TERMO DE RESPONSABILIDADE.`,
          vacina: "Sim, todas em dia.",
          vermifugo: "Sim.",
          localizacao: "Planaltina.",
          idade: "9 anos.",
          raca: "Calopsita",
          castracao: "Sim.",
          porte: "Grande.",
          especie: "Cachorro",
          detalhes: "Está bem cuidado e com todas as necessidades atendidas."
        }
      ],
      animalSelecionado: null, // Armazena o ID do animal clicado
      especieSelecionada: "Todos",
      porteSelecionado: "Todos",
    };
  }

  handlePress(animalId) {
    this.setState({
      animalSelecionado: this.state.animalSelecionado === animalId ? null : animalId, // Alterna entre mostrar e esconder detalhes
    });
  }

  handleEspecieChange = (especie) => {
    this.setState({ especieSelecionada: especie });
  };

  handlePorteChange = (porte) => {
    this.setState({ porteSelecionado: porte });
  };

  render() {
    const especies = ["Selecione a espécie", "Cachorro", "Gato", "Pássaro"];
    const portes = ["Selecione o porte", "Pequeno", "Médio", "Grande"];
    const { especieSelecionada, porteSelecionado, animais } = this.state;
    const animaisFiltrados = animais.filter((animal) => {
      const especieMatch = especieSelecionada === "Todos" || animal.especie === especieSelecionada;
      const porteMatch = porteSelecionado === "Todos" || animal.porte === porteSelecionado;
      return especieMatch && porteMatch;
    });

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

        <Picker
          selectedValue={this.state.especieSelecionada}
          style={{ height: 50, width: 200, alignSelf: "center" }}
          onValueChange={(itemValue) => this.handleEspecieChange(itemValue)}
        >
          {especies.map((especie) => (
            <Picker.Item key={especie} label={especie} value={especie}/>
          ))}
        </Picker>

        <Picker
          selectedValue={this.state.porteSelecionado}
          style={{ height: 50, width: 200, alignSelf: "center", marginTop: 10 }}
          onValueChange={(itemValue) => this.handlePorteChange(itemValue)}
        >
          {portes.map((porte) => (
            <Picker.Item key={porte} label={porte} value={porte}/>
          ))}
        </Picker>

        {animaisFiltrados.map((animal) => (
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
            onPress={() => this.handlePress(animal.id)}
          >
            <View style={{ alignItems: "center", marginBottom: 10 }}>
              <Image 
                source={animal.imagem}
                style={{ width: 300, height: 500, borderRadius: 10, marginTop: 20 }}
              />

            <Text 
              style={{fontSize: 24, color: "#006400", textAlign: "center", marginVertical: 10 }} >
                {animal.nome}
              </Text>
            </View>

            <View
              style={{ backgroundColor: "#fff", padding: 20, borderRadius: 10, alignItems: "center" }}
            >
              <Text
                style={{ fontSize: 18, fontFamily: "Roboto", textAlign: "center", lineHeight: 24, width: 300 }}
              >
                {animal.descricao}
              </Text>

              {this.state.animalSelecionado === animal.id && (
                <View
                 style={{marginTop: 10, padding: 10, backgroundColor: "#e6ffe6", borderRadius: 8 }} 
                >
                  <Text
                    style={{fontSize: 16, color: "#006400", fontFamily: "Roboto", textAlign: "center" }}>
                      Vacina: {animal.vacina}{"\n"}
                      Vermífugo: {animal.vermifugo} {"\n"}
                      Localização: {animal.localizacao}{"\n"}
                      Idade: {animal.idade}{"\n"}
                      Raça: {animal.raca}{"\n"}
                      Castração: {animal.castracao}{"\n"}
                      Porte: {animal.porte}{"\n"}
                      Detalhes: {animal.detalhes}{"\n"}
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
