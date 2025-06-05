import React, { Component } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Picker, Alert, Platform, Keyboard } from "react-native";
import Slider from '@react-native-community/slider';
import { Button, KeyboardAvoidingView, Modal, Switch, TextInput, TouchableWithoutFeedback } from "react-native-web";

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
          vermifugo: "Sim",
          localizacao: "Octogonal",
          idade: "1 ano", //ok
          sexo: "Fêmea", //ok
          raca: "Sem raça definida",
          castracao: "Não",
          porte: "Pequeno", //ok
          especie: "Cachorro", //ok
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
          vermifugo: "Não",
          localizacao: "Ponte Alta.",
          idade: "2 meses.",
          sexo: "Fêmea",
          raca: "Sem raça definida",
          castracao: "Sim",
          porte: "Médio",
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
          vermifugo: "Sim",
          localizacao: "Lago Norte.",
          idade: "2 anos.",
          sexo: "Macho",
          raca: "Sem raça definida",
          castracao: "Não",
          porte: "Pequeno",
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
          vermifugo: "Sim",
          localizacao: "Candangolândia.",
          idade: "1 mês.",
          sexo: "Macho",
          raca: "Calopsita",
          castracao: "Não",
          porte: "Pequeno",
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
          vermifugo: "Sim",
          localizacao: "Planaltina.",
          idade: "9 anos.",
          sexo: "Macho",
          raca: "Calopsita",
          castracao: "Sim",
          porte: "Grande",
          especie: "Cachorro",
          detalhes: "Está bem cuidado e com todas as necessidades atendidas."
        }
      ],
      animalSelecionado: null, // Armazena o ID do animal clicado
      especieSelecionada: "Todos",
      sexoSelecionado: "Todos",
      idadeSelecionada: "Todos",
      porteSelecionado: "Todos",
      castracaoSelecionado: null,
      vermifugoSelecionado: null,
      mostrarFormulario: false,
      nome: '',
      imagem: '',
      descricao: '',
      vacina: '',
      vermifugo: '',
      localizacao: '',
      idade: '',
      sexo: '',
      raca: '',
      castracao: '',
      porte: '',
      especie: '',
      detalhes: '',
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

  handleSexoChange = (sexo) => {
    this.setState({ sexoSelecionado: sexo });
  };

  normalizeIdade = (idadeString) => {
    if (idadeString.includes("mês") || idadeString.includes("meses")) return 0;
    const idadeNum = parseInt(idadeString);
    return isNaN(idadeNum) ? 0 : idadeNum;
  }

  render() {
    const especies = ["Todos", "Cachorro", "Gato", "Pássaro"];
    const sexos = ["Todos", "Fêmea", "Macho"];
    const portes = ["Todos", "Pequeno", "Médio", "Grande"];
    const { especieSelecionada, sexoSelecionado, animais, mostrarFormulario } = this.state;
    const animaisFiltrados = animais.filter((animal) => {
      const especieMatch = especieSelecionada === "Todos" || animal.especie === especieSelecionada;
      const sexoMatch = sexoSelecionado === "Todos" || animal.sexo === sexoSelecionado;

      const idadeNumero = this.normalizeIdade(animal.idade);
      const idadeMatch = this.state.idadeSelecionada === "Todos" ||
        (this.state.idadeSelecionada === 0 && idadeNumero < 1) ||
        (this.state.idadeSelecionada === 11 && idadeNumero > 10) ||
        this.state.idadeSelecionada === idadeNumero;

      const porteMatch = this.state.porteSelecionado === "Todos" || animal.porte === this.state.porteSelecionado;

      const castracaoMatch = this.state.castracaoSelecionado === null ||
        (this.state.castracaoSelecionado === true && animal.castracao === "Sim") ||
        (this.state.castracaoSelecionado === false && animal.castracao === "Não");

      const vermifugacaoMatch = this.state.vermifugoSelecionado === null ||
        (this.state.vermifugoSelecionado === true && animal.vermifugo === "Sim") ||
        (this.state.vermifugoSelecionado === false && animal.vermifugo === "Não");


      return especieMatch && sexoMatch && idadeMatch && porteMatch && castracaoMatch && vermifugacaoMatch;
    });

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView style={{ flex: 1, backgroundColor: "#f5f5f5" }} keyboardShouldPersistTaps="handled" >
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

          <Text style={{ fontSize: 18, color: "#000", marginLeft: 20, marginBottom: 5, textAlign: "center" }}>
            Selecione a espécie desejada:
          </Text>

          <Picker
            selectedValue={this.state.especieSelecionada}
            style={{ height: 50, width: 200, alignSelf: "center" }}
            onValueChange={(itemValue) => this.handleEspecieChange(itemValue)}
          >
            {especies.map((especie) => (
              <Picker.Item key={especie} label={especie} value={especie} />
            ))}
          </Picker>

          <Text style={{ fontSize: 18, color: "#000", marginLeft: 20, marginBottom: 5, marginTop: 20, textAlign: "center" }}>
            Selecione o sexo desejado:
          </Text>

          <Picker
            selectedValue={this.state.sexoSelecionado}
            style={{ height: 50, width: 200, alignSelf: "center", marginTop: 10 }}
            onValueChange={(itemValue) => this.handleSexoChange(itemValue)}
          >
            {sexos.map((sexo) => (
              <Picker.Item key={sexo} label={sexo} value={sexo} />
            ))}
          </Picker>

          <View style={{ marginVertical: 20, paddingHorizontal: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: "#000", marginBottom: 5 }}>
              Selecione a idade desejada:
            </Text>

            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={-1}
              maximumValue={11}
              step={1}
              value={this.state.idadeSelecionada === "Todos" ? -1 : this.state.idadeSelecionada}
              onValueChange={(valor) => this.setState({ idadeSelecionada: valor === -1 ? "Todos" : valor })}
              minimumTrackTintColor="#006400"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#006400"
            />

            <Text style={{ fontSize: 16, textAlign: "center", marginTop: 10 }}>
              {this.state.idadeSelecionada === "Todos"
                ? "Todos" : this.state.idadeSelecionada === 0
                  ? "Filhote" : this.state.idadeSelecionada === 11
                    ? "Idoso" : `${this.state.idadeSelecionada} anos`}
            </Text>
          </View>

          <View style={{ marginVertical: 20, paddingHorizontal: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: "#000", marginBottom: 5 }}>
              Selecione o porte desejado:
            </Text>

            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={portes.length - 1} // Ajusta ao número de opções
              step={1}
              value={portes.indexOf(this.state.porteSelecionado)}
              onValueChange={(valor) =>
                this.setState({ porteSelecionado: portes[valor] })
              }
              minimumTrackTintColor="#006400"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#006400"
            />

            <Text style={{ fontSize: 16, textAlign: "center", marginTop: 10 }}>
              {this.state.porteSelecionado === "Todos" ? "Todos" : this.state.porteSelecionado}
            </Text>
          </View>

          <View style={{ marginVertical: 20, paddingHorizontal: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: "#000", marginBottom: 10, textAlign: "center" }}>
              Filtrar por castração:
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <Text style={{ fontSize: 16, marginRight: 10 }}>
                Não
              </Text>
              <Switch
                value={this.state.castracaoSelecionado === true}
                onValueChange={(valor) =>
                  this.setState({ castracaoSelecionado: valor })}
                trackColor={{ false: "#d3d3d3", true: "#006400" }}
                thumbColor={this.state.castracaoSelecionado ? "#006400" : "#f4f3f4"}
              />
              <Text style={{ fontSize: 16, marginRight: 10 }}>
                Sim
              </Text>
            </View>

            <Text style={{ fontSize: 18, color: "#000", marginBottom: 10, textAlign: "center" }}>
              Filtrar por vermifugação:
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 18, marginRight: 10 }}>
                Não
              </Text>
              <Switch
                value={this.state.vermifugoSelecionado === true}
                onValueChange={(valor) =>
                  this.setState({ vermifugoSelecionado: valor })}
                trackColor={{ false: "#d3d3d3", true: "#006400" }}
                thumbColor={this.state.vermifugoSelecionado ? "#006400" : "#f4f3f4"}
              />
              <Text style={{ fontSize: 16, marginLeft: 10 }}>
                Sim
              </Text>

            </View>
          </View>

          {animaisFiltrados.map((animal) => (
            <TouchableOpacity
              activeOpacity={1}
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
                  style={{ fontSize: 24, color: "#006400", textAlign: "center", marginVertical: 10 }} >
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
                    style={{ marginTop: 10, padding: 10, backgroundColor: "#e6ffe6", borderRadius: 8 }}
                  >
                    <Text
                      style={{ fontSize: 16, color: "#006400", fontFamily: "Roboto", textAlign: "center" }}>
                      Vacina: {animal.vacina}{"\n"}
                      Vermífugo: {animal.vermifugo} {"\n"}
                      Localização: {animal.localizacao}{"\n"}
                      Idade: {animal.idade}{"\n"}
                      Sexo: {animal.sexo}{"\n"}
                      Raça: {animal.raca}{"\n"}
                      Castração: {animal.castracao}{"\n"}
                      Porte: {animal.porte}{"\n"}
                      Detalhes: {animal.detalhes}{"\n"}
                    </Text>
                    <Button
                      title="Quero adotar!"
                      onPress={() => this.setState({ mostrarFormulario: true, animalAtual: animal })}
                      color="#006400"
                    />

                    {this.state.mostrarFormulario && (
                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.mostrarFormulario}
                        onRequestClose={() => this.setState({ mostrarFormulario: false })}
                        presentationStyle="overFullScreen"
                      >
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
                          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                            <TouchableOpacity activeOpacity={1} onPress={() => { }} style={{ width: "80%", backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                              <View style={{ width: "80%", backgroundColor: "#fff", padding: 20, borderRadius: 10 }}>
                                <Text style={{ fontSize: 18, marginBottom: 10 }}>
                                  Adote o(a) {this.state.animalAtual?.nome}!
                                </Text>

                                <TextInput
                                  placeholder="Nome"
                                  value={this.state.nomeAdotante}
                                  onChangeText={(text) => this.setState({ nomeAdotante: text })}
                                  style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                                />

                                <TextInput
                                  placeholder="Telefone"
                                  value={this.state.telefoneAdotante}
                                  onChangeText={(text) => this.setState({ telefoneAdotante: text })}
                                  style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                                />

                                <TextInput
                                  placeholder="E-mail"
                                  value={this.state.emailAdotante}
                                  onChangeText={(text) => this.setState({ emailAdotante: text })}
                                  style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                                />

                                <TextInput
                                  placeholder="Endereço"
                                  value={this.state.enderecoAdotante}
                                  onChangeText={(text) => this.setState({ enderecoAdotante: text })}
                                  style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                                />

                                <Button
                                  title="Adotar!"
                                  onPress={() => {
                                    this.setState({
                                      mostrarFormulario: false,
                                      animalAtual: null,
                                      nomeAdotante: "",
                                      telefoneAdotante: "",
                                      emailAdotante: "",
                                      enderecoAdotante: ""
                                    });
                                  }}
                                  color="#006400"
                                />

                                <Button
                                  title="Fechar"
                                  onPress={() => this.setState({ mostrarFormulario: false })}
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        </TouchableWithoutFeedback>
                      </Modal>
                    )}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default App;