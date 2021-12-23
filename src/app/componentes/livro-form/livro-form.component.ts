import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LivroService } from 'src/app/servicos/livro.service';
import { Livro } from '../../Livro';

@Component({
  selector: 'app-livro-form',
  templateUrl: './livro-form.component.html',
  styleUrls: ['./livro-form.component.css']
})

export class LivroFormComponent implements OnInit {
  form!: FormGroup

  livro!: any

  acao!:string

  isModal!:boolean


  constructor(private fb: FormBuilder, private service: LivroService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      id: [null],
      nome: [null],
      autor: [null],
      foto: [null],
      genero:[null]
    })

    const id_entrada = <any>this.route.snapshot.params['id']
    //id_entrada que representa o id que peguei na rota e que identifica o meu objeto no banco de dados
    console.log("id de entrada: " + id_entrada)
    this.service.getUm(id_entrada).subscribe({
      next: (resultado) => {console.log(resultado)
                            this.livro = resultado
                            this.updateForm(this.livro)
      }, //para aparecer o resultado no input do editar, chamo com ngModel
      error: (erro) => console.error(erro),
      complete: () => console.info('Livro encontrado')
    })

  }

  salvarLivro() {

    console.log(this.form.value != null)
    if(this.form.value.id){
      //vamos editar
      this.service.editLivro(this.form.value.id, this.form.value).subscribe({
              next: (resultado) => console.log("Livro editado com sucesso"),
              error: (erro) => console.error(erro),
              complete: () => {
              console.info("Edição completada com sucesso")
            }
      })
      this.isModal = true
      this.acao = "cadastro"
    }else{
      //vamos cadastrar
      this.service.addLivros(this.form.value).subscribe({
              next: (resultado) => console.log("Livro cadastrado com sucesso"),
              error: (erro) => console.error(erro),
              complete: () => {
              console.info("Cadastro completado com sucesso")
              this.router.navigate(['/lista'])}
      })
      this.isModal = true
      this.acao = "editado"
    }
  }

  updateForm(livro:any) {
    //pathValue usamos quando queremos alterar o conteúdo de alguns inputs, escolhemos quais vamos querer alterar
    //setValue altera todos os inputs de uma vez só, então tenho que declarar todos para funcionar
    this.form.patchValue({
      id: livro.id,
      nome: livro.nome,
      autor: livro.autor,
      genero:livro.genero,
      foto:livro.foto
    });
  }

  fecharModal(){
    this.router.navigate(['/lista'])
  }


}
