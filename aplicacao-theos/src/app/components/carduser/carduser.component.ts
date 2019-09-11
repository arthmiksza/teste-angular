import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../components/base-component/base-component.component'
import { IUser } from '../../interfaces/IUser' ;

@Component({
  selector: 'app-carduser',
  templateUrl: './carduser.component.html',
  styleUrls: ['./carduser.component.scss']
})

export class CardUserComponent extends BaseComponent {
    @Input()
    data: IUser = null;
    @Input()
    showActions = false;
    @Output()
    onDeleteUser: EventEmitter<any> = new EventEmitter()
    @Output()
    onClickCard: EventEmitter<any> = new EventEmitter()
    public expand = false;
    constructor(private router: Router) {
        super();
    }

    get fullName() {
        return this.data.tx_nome + ' ' + this.data.tx_sobrenome
    }

    get location() {
        return this.data.tx_cidade + ' - ' + this.data.tx_estado
    }

    deleteUser(ev) {
        ev.stopPropagation();
        this.onDeleteUser.emit(this.data);
    }

    editUser() {
        this.onClickCard.emit('editUser');
        this.router.navigateByUrl('/registry/' + this.data.id_usuario);
    }

    newUser() {
        this.onClickCard.emit('newUser');
        this.router.navigateByUrl('/registry');
    }

}
