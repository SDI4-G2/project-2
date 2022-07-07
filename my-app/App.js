import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Item,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
const { sequelize } = require("./models/DBConn");
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      dataku: [],
    };
  }

  klikPost() {
    var url = "http://101.100.160.90:3000/data";
    axios
      .post(url, {
        nama: this.state.input1,
        usia: this.state.input2,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.state.input1 = "";
    this.state.input2 = "";
  }

  klikGet() {
    var url = "http://101.100.160.90:3000/data";
    axios.get(url).then((ambilData) => {
      console.log(ambilData.data);
      this.setState({
        dataku: ambilData.data,
      });
    });
  }

  render() {
    const dataPostgre = this.state.dataku.map((item, index) => {
      var arrayku = ["Nama: ", item.nama, ", Usia: ", item.usia, " th."].join(
        " "
      );
      return (
        <Text style={{ fontSize: 20, fontWeight: "bold" }} key={index}>
          {arrayku}
        </Text>
      );
    });

    return (
      <View>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text style={{ marginTop: 20, fontSize: 25, fontWeight: "bold" }}>
            RN ♥ Express ♥ PostgreSQL
          </Text>

          <TextInput
            placeholder="Ketik nama di sini..."
            style={{ height: 55, width: 350, fontSize: 15 }}
            onChangeText={(input1) => this.setState({ input1 })}
            value={this.state.input1}
          />

          <TextInput
            placeholder="Ketik usia di sini..."
            style={{ height: 55, width: 350, fontSize: 15 }}
            onChangeText={(input2) => this.setState({ input2 })}
            value={this.state.input2}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              borderRadius: 10,
              flex: 1,
              width: 100,
              height: 50,
              margin: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={this.klikPost.bind(this)}
          >
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              POST
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "green",
              borderRadius: 10,
              flex: 1,
              width: 100,
              height: 50,
              margin: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={this.klikGet.bind(this)}
          >
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              GET
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "column", alignItems: "center" }}>
          {dataPostgre}
        </View>
      </View>
    );
  }
}

export default App;
