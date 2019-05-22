import {Component, OnInit} from '@angular/core';
import {EvolutionPersonnelService} from "../../../controller/service/evolutions/evolution-personnel.service";
import {EvolutionPersonnel} from "../../../controller/model/evolution/evolution-personnel.model";
import {EchelonService} from "../../../controller/service/evolutions/echelon.service";
import {LoiEvolutionTypePersonnelService} from "../../../controller/service/evolutions/loi-evolution-type-personnel.service";
import * as jsPDF from 'jspdf';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-evolution-personnel-list',
  templateUrl: './evolution-personnel-list.component.html',
  styleUrls: ['./evolution-personnel-list.component.css']
})
export class EvolutionPersonnelListComponent implements OnInit {

  public newLocalEvolutionPersonnel = new EvolutionPersonnel('', null, '', '', null, null, '');


  constructor(private evolutionPersonnelService: EvolutionPersonnelService, private echelonService: EchelonService, private loiEvolutionTypePersonnelService: LoiEvolutionTypePersonnelService) {
  }


  ngOnInit() {
  }

  public get evolutionsPersonnel() {
    return this.evolutionPersonnelService.evolutionsPersonnel;
  }

  public get newEvolutionPersonnel() {
    return this.evolutionPersonnelService.newEvolutionPersonnel
  }

  public get echelons() {
    return this.echelonService.echelons;
  }

  public get loisEvolutionTypePersonnel() {
    return this.loiEvolutionTypePersonnelService.loisEvolutionTypePersonnel;
  }

  public get searchInput() {
    return this.evolutionPersonnelService.searchInput;
  }

  public set searchInput(data) {
    this.evolutionPersonnelService.searchInput = data;
  }


  toggleData(data) {
    // @ts-ignore
    $('#modalEvolutionPersonnel').modal('show');
    this.newLocalEvolutionPersonnel = new EvolutionPersonnel(data.reference, data.loiEvolutionTypePersonnel, data.referencePersonnel, data.referenceTypePersonnel, data.echelonDepart, data.echelonFin, data.dateEvolution);
  }

  modifierEvolutionPersonnel() {
    this.evolutionPersonnelService.modifierEvolutionPersonnel(this.newLocalEvolutionPersonnel);
  }

  supprimerEvolutionPersonnel(data) {
    this.evolutionPersonnelService.deleteEvolutionPersonnel(data);
  }

  search() {
    this.evolutionPersonnelService.search();
  }

  getAll() {
    this.evolutionPersonnelService.getEvolutionsPersonnelFromDatabase();
  }

  print(data) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("RAPPORT D'EVOLUTION PERSONNEL", 10, 20);
    doc.setFontSize(12);
    doc.text("Reference de l'evolution : " + data.reference, 10, 40);
    doc.text("Reference du personnel : " + data.referencePersonnel, 10, 50);
    doc.text("Reference du type de personnel : " + data.referenceTypePersonnel, 10, 60);
    doc.text("Loi d'evolution de type personnel : ", 10, 70);
    doc.setFontSize(10);
    doc.text("Reference du loi : " + data.loiEvolutionTypePersonnel.reference, 15, 80);
    doc.text("Nombre d'annees : " + data.loiEvolutionTypePersonnel.nombreAnnees, 15, 90);
    doc.setFontSize(12);
    doc.text("Echelon de depart : ", 10, 100);
    doc.setFontSize(10);
    doc.text("Reference de l'echelon : " + data.echelonDepart.reference, 15, 110);
    doc.text("Ordre de l'echelon : " + data.echelonDepart.ordre, 15, 120);
    doc.text("Libelle de l'echelon : " + data.echelonDepart.libelle, 15, 130);
    doc.setFontSize(12);
    doc.text("Echelon de fin : ", 10, 140);
    doc.setFontSize(10);
    doc.text("Reference de l'echelon : " + data.echelonFin.reference, 15, 150);
    doc.text("Ordre de l'echelon : " + data.echelonFin.ordre, 15, 160);
    doc.text("Libelle de l'echelon : " + data.echelonFin.libelle, 15, 170);
    doc.setFontSize(12);
    doc.text("Date d'evolution : " + data.dateEvolution, 10, 180);


    Swal.fire({
      title: 'Le type du fichier',
      input: 'select',
      inputOptions: {
        'PDF': 'Fichier PDF (option par defaut)',
        'DOCX': 'Fichier MS Word',
        'TXT': 'Fichier Texte'
      },
      inputPlaceholder: 'Selectionner le type du fichier a etre telecharger',
      showCancelButton: true,
      inputValidator: function (value) {
        return new Promise(function (resolve) {
          if (value === 'DOCX') {
            Swal.fire({
              title: 'Telechargement en cours ...!',
              timer: 1000,
              onBeforeOpen: () => {
                Swal.showLoading()
              }
            }).then(() => {
              resolve();
              doc.save(data.reference + new Date() + ".docx");
            });

          } else if (value === 'TXT') {
            Swal.fire({
              title: 'Telechargement en cours ...!',
              timer: 1000,
              onBeforeOpen: () => {
                Swal.showLoading();
              }
            }).then(() => {
              resolve();
              doc.save(data.reference + new Date() + ".txt");
            });

          } else {
            Swal.fire({
              title: 'Telechargement en cours ...!',
              timer: 1000,
              onBeforeOpen: () => {
               Swal.showLoading()
              }
            }).then((result) => {
              resolve();
              doc.save(data.reference + new Date() + ".pdf");
            });
          }
        })
      }
    });
  }

  // @Id
  // @GeneratedValue(strategy = GenerationType.AUTO)
  // private Long id;
  // private String reference;
  // @Lob
  // @Column(length = 15000)
  // private LoiEvolutionTypePersonnel loiEvolutionTypePersonnel;
  // private String referencePersonnel;
  // private String referenceTypePersonnel;
  // @OneToOne
  // private Echelon echelonDepart;
  // @OneToOne
  // private Echelon echelonFin;
  // @Temporal(javax.persistence.TemporalType.DATE)
  // private Date dateEvolution;


}
