import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  charmanderSalud = 100;
  pikachuSalud = 100;
  juegoCorriendo = false;
  turnos = [];

  iniciarJuego() {
    this.juegoCorriendo = true;
    this.charmanderSalud = 100;
    this.pikachuSalud = 100;
    this.turnos = [];
  }

  atacar() {
    let damage = this.calculateDamage(3, 10);
    this.pikachuSalud -= damage;
    this.turnos.unshift({
      isPlayer: true,
      text: 'Charmander golpea Pikachu por ' + damage
    });
    if (this.checkWin()) {
      return;
    }

    this.monsterAttack();
  }

  specialAttack() {
    let damage = this.calculateDamage(10, 20);
    this.pikachuSalud -= damage
    this.turnos.unshift({
      isPlayer: true,
      text: 'Charmander golpea Pikachu muy fuerte por ' + damage
    });
    if (this.checkWin()) {
      return;
    }
    this.monsterAttack();
  }

  monsterAttack() {
    let damage = this.calculateDamage(5, 12);
    this.charmanderSalud -= damage;
    this.checkWin();
    this.turnos.unshift({
      isPlayer: false,
      text: 'Pikachu golpea Charmander por ' + damage
    });
  }

  heal() {
    if (this.charmanderSalud <= 90) {
      this.charmanderSalud += 10;
    } else {
      this.charmanderSalud = 100;
    }
    this.turnos.unshift({
      isPlayer: true,
      text: 'Charmander se cura por 10'
    });
    this.monsterAttack();
  }

  giveUp() {
    this.juegoCorriendo = false;
  }

  calculateDamage(min, max) {
    return Math.max(Math.floor(Math.random() * max) + 1, min);
  }

  checkWin() {
    if (this.pikachuSalud <= 0) {
      if (confirm('Charmander ganó! Nuevo juego?')) {
        this.iniciarJuego();
      } else {
        this.juegoCorriendo = false;
      }
      return true;
    } else if (this.charmanderSalud <= 0) {
      if (confirm('Charmander perdió! Nuevo juego?')) {
        this.iniciarJuego();
      } else {
        this.juegoCorriendo = false;
      }
      return true;
    }
    return false;
  }

}
