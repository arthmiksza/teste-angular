import { Component } from '@angular/core';
import { BaseComponent } from '../../components/base-component/base-component.component'
import { ApiService } from '../../services/api.service'
import { ToastService } from '../../services/toast.service';
import { IUser } from '../../interfaces/IUser' ;

declare const $;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent extends BaseComponent {
  //página principal, será a listagem dos usuários
  public users: Array<IUser> = [];
  public userForDelete: IUser;
  public page = 1;
  public limit = 3;
  public hasMore = true;

  public loading = true;
  public openModalDelete = false;

  constructor(private api: ApiService, public toast: ToastService) {
    super();
  }
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    if(!this.hasMore) return;
    this.loading = true;
    this.api.getAllUsers(this.page, this.limit).subscribe((res: Array<IUser>) => {
      res.forEach((r)=>{this.users.push(r)});
      this.hasMore = res.length > 0;
      this.loading = false;
    });
  }

  getMoreUsers() {
    this.page++;
    this.getUsers();
  }

  deleteUser(ev) {
    this.userForDelete = ev;
    $('#modalDelete').modal('show');
  }

  confirmDeleteUser() {
    this.loading = true;
    this.api.deleteUser(this.userForDelete.id_usuario).subscribe((res) => {
      this.toast.toastSubject.next({type: 'success', message: 'Usuário deletado com sucesso.'});
      this.page = 1;
      this.users = [];
      this.hasMore = true;
      this.userForDelete = null;
      this.loading = false;
      $('#modalDelete').modal('hide');
      this.getUsers();
    })
  }
}
