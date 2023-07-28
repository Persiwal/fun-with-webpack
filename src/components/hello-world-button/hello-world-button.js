import './hello-world-button.css';

class HelloWorldButton {
  render() {
    const button = document.createElement('button');
    button.innerHTML = 'Hello world';
    const body = document.querySelector('body');
    button.classList.add('hello-world-button');

    button.onclick = function () {
      const p = document.createElement('p');
      p.innerHTML = 'Hello world';
      p.classList.add('hello-world-text');
      body.appendChild(p);
    };

    body.appendChild(button);
  }
}

export default HelloWorldButton;
