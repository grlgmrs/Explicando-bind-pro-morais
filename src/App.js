import React, { useState, useEffect } from "react";

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => setUser({ ...json }));
  }, []);

  return (
    <div>
      <h1>In FunctionalComponent:</h1>
      <ul>
        <li>
          <b>Título</b>: {user.title}
        </li>
        <li>
          <b>Completado?: </b>: {user.completed ? "Sim!" : "Não!"}
        </li>
        <li>
          <input
            type="text"
            onInput={({ target }) => setUser({ ...user, title: target.value })}
          />
          <input
            type="checkbox"
            checked={user.completed}
            onChange={({ target }) =>
              setUser({ ...user, completed: target.checked })
            }
          />
        </li>
      </ul>
    </div>
  );
};

class AppClassComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        title: "",
        completed: false,
      },
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => this.setState({ user: { ...json } }));
  }

  handleUserTitle({ target }) {
    const { user } = this.state;

    this.setState({ user: { ...user, title: target.value } });
  }

  handleUserCompleted({ target }) {
    // const { user } = this.state;
    // this.setState({ user: { ...user, completed: target.checked } });
  }

  async funcaoDeTeste() {
    const {
      user: { title },
      ...user
    } = this.state;

    new Promise((res) =>
      setTimeout(() => {
        console.log("Title definido no começo da função: ", title);
        console.log("Title atual: ", this.state.user.title);

        res();
      }, 1500)
    );

    this.setState({
      user: { ...user, title: "Alguma coisa depois da promise" },
    });
  }

  porqueOBindInterrogacao() {
    function whatever() {
      console.log(this);
    }

    const onclick = whatever.bind(this);

    onclick();
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        <h1>In classComponent:</h1>
        <ul>
          <li>
            <b>Título</b>: {user.title}
          </li>
          <li>
            <b>Completado?: </b>: {user.completed ? "Sim!" : "Não!"}
          </li>
          <li>
            <input type="text" onInput={this.handleUserTitle} />
            <input
              type="checkbox"
              checked={user.completed}
              onChange={this.handleUserCompleted.bind(this)}
            />
          </li>
        </ul>
        <button onClick={this.funcaoDeTeste}>
          Clique aqui e veja a mágica
        </button>
        {/* button.onclick = this.funcaoDeTeste.bind(this) */}
        <button onClick={this.porqueOBindInterrogacao.bind(this)}>
          Clique aqui e veja a mágica do bind
        </button>
      </div>
    );
  }
}

class Testando5 {
  constructor() {
    this.hello = "Oi teste from 5";
    this.methods = {};
  }

  chamaAsVueCoisas2 = () => {
    Reflect.ownKeys(vueCoisas2.methods).forEach(
      (key) => (this.methods[key] = vueCoisas2.methods[key].bind(this))
    );
  };
}

const testando5 = new Testando5();

testando5.methods;

testando5.chamaAsVueCoisas2();

testando5.methods.next();

export default AppClassComponent;
