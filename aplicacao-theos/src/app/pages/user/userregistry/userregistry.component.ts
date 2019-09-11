import { Component } from '@angular/core';
import { BaseComponent } from '../../../components/base-component/base-component.component';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { IUser } from '../../../interfaces/IUser' ;
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
declare const $;

@Component({
  selector: 'app-userregistry',
  templateUrl: './userregistry.component.html',
  styleUrls: ['./userregistry.component.scss']
})

export class UserRegistryComponent extends BaseComponent {

    userForm: FormGroup;
    
    nameSearch: string = '';
    professionSearch: string = '';
    users: Array<IUser> = [];

    viewOnly: boolean = false;
    loading: boolean = true;
    submitted: boolean = false;
    idUser: number = null;
    sexOpt: Array<String> = ['Masculino', 'Feminino', 'Não Definido'];
    stateOpt: Array<string> = ['Paraná', 'São Paulo', 'Santa Catarina'];
    cityOpt: Array<{stateName: string, cities: Array<string>}> = [
        {
            stateName: 'Paraná',
            cities:  ['São João do Ivaí', 'Maringá', 'Apucarana', 'Londrina', 'Ivaiporã', 'Curitiba', 'Cascavél', 'Cornélio Procópio']   
        }, 
        {
            stateName: 'São Paulo',
            cities:  ['São Paulo', 'Leme', 'Santos', 'Presidente Prudente', 'Franca']   
        }, 
        {
            stateName: 'Santa Catarina',
            cities:  ['Blumenau', 'Florianópolis', 'Joinville', 'Chapecó', 'Brusque']   
        }
    ];
    professionOpt: Array<string> = ['Desenvolvedor WEB', 'Desenvolvedora Mobile', 'Formatador de PC', 'Analista de Mercado', 'Gerente de Projetos', 'Pintor', 'Professor'];

    constructor(private api: ApiService, private activatedRoute: ActivatedRoute, private router: Router, public toast: ToastService) {
        super();
    }

    ngOnInit() {
        this.userForm = new FormGroup({
            tx_nome: new FormControl('', [Validators.required]),
            tx_sobrenome: new FormControl('', [Validators.required]),
            tx_sexo: new FormControl(''),
            tx_email: new FormControl('', [Validators.required, Validators.email]),
            tx_cidade: new FormControl(''),
            tx_estado: new FormControl(''),
            dt_cadastro: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
            tx_formacao: new FormControl('', [Validators.required]),
            tx_profissao: new FormControl('', [Validators.required])
        });

        this.activatedRoute.params.subscribe((params: Params) => {
            this.idUser = params.id;
            if(this.idUser) {
                this.getUser();
            } else {
                this.loading = false;
            }
        });
    }

    get control() {
      return this.userForm.controls;
    }

    get cities() {
        let f = this.cityOpt.filter((city) => city.stateName == this.control.tx_estado.value)
        return f.length > 0? f[0].cities:null;
    }
    
    getUser() {
        this.viewOnly = true;
        this.disableControls(true);
        this.api.getOneUser(this.idUser).subscribe((res) => {
            let user = res[0];
            this.control.tx_nome.setValue(user.tx_nome);
            this.control.tx_sobrenome.setValue(user.tx_sobrenome);
            this.control.tx_sexo.setValue(user.tx_sexo);
            this.control.tx_email.setValue(user.tx_email);
            this.control.tx_cidade.setValue(user.tx_cidade);
            this.control.tx_estado.setValue(user.tx_estado);
            this.control.tx_formacao.setValue(user.tx_formacao);
            this.control.tx_profissao.setValue(user.tx_profissao);
            this.control.dt_cadastro.setValue(user.dt_cadastro);
            this.loading = false;
        });
    }

    disableControls(disable: boolean = true) {
        this.viewOnly || disable? this.userForm.disable():this.userForm.enable();
    }

    setViewOnly(disable: boolean = true) {
        this.viewOnly = disable;
        this.disableControls(disable);
    }

    searchUserModal() {
        this.users = [];
        $('#modalSearch').modal('show');
    }

    searchUserModalClose() {
        $('#modalSearch').modal('hide');
    }

    searchUser(type) {
        this.loading = true;
        let filter = type == 1? this.nameSearch : this.professionSearch;
        this.api.getAllUsersWithFilter(filter, type).subscribe((res: Array<IUser>) => {
            if(res.length == 0) this.toast.toastSubject.next({type: 'error', message: 'Nenhum usuário encontrado.'});
            this.users = res;
            this.loading = false;
        })
    }

    backToSearch() {
        this.users = [];
    }

    onSubmit() {
        this.submitted = true;
        if (this.userForm.valid) {
            this.loading = true;
            let user: IUser = this.userForm.value;
            if (this.idUser) {
                user.id_usuario = this.idUser;
                this.api.updateUser(user).subscribe(() => {
                    this.toast.toastSubject.next({type: 'success', message: 'Usuário atualizado com sucesso.'});
                    this.loading = false;
                });
            } else {
                this.api.createUser(user).subscribe((res: any) => {
                    this.toast.toastSubject.next({type: 'success', message: 'Usuário criado com sucesso.'});
                    this.router.navigateByUrl('/registry/' + res[0].id_usuario);
                    this.loading = false;
                })
            }
        } else {
            this.toast.toastSubject.next({type: 'error', message: 'O formulário apresenta campos inválidos.'});
        }
    }
}
