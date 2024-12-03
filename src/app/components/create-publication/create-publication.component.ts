import { Component } from '@angular/core';
import { Entrepreneurship, EntrepreneurshipService } from '../../services/entrepreneurship.service';
import { Router } from '@angular/router';
import { Category, CategoryService } from '../../services/category.service';
import { City, CityService } from '../../services/city.service';


@Component({
  selector: 'app-create-publication',
  standalone: false,

  templateUrl: './create-publication.component.html',
  styleUrl: './create-publication.component.css'
})
export class CreatePublicationComponent {

  entrepreneurship: Entrepreneurship = {
    idEntrepreneurship: 0,
    entrepreneurshipName: "",
    entrepreneurshipDescription: "",
    image: "",
    address: "",
    idCity: 0,
    idUser: 5,
    idCategories: [],
    user: "",
    nameCategories: [],
    nameCity: "",
    comments: [],
    likes: 0
  }

  categories: Category[] = [];
  cities: City[] = [];
  errorMessage: string = '';

  constructor(private entrepreneurshipService: EntrepreneurshipService, private categoryService: CategoryService,
    private cityService: CityService, private router: Router) { }


  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data.sort((a, b) => a.idCategory - b.idCategory);
      },
      (error) => {
        this.errorMessage = 'Error al obtener las categorías';
        console.error(error);
      }
    );

    this.cityService.getAllCities().subscribe(
      (data) => {
        this.cities = data.sort((a, b) => a.idCity - b.idCity);
      },
      (error) => {
        this.errorMessage = 'Error al obtener las ciudades';
        console.error(error);
      }
    );
  }


  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const value = parseInt(checkbox.value, 10);

    if (checkbox.checked) {
      this.entrepreneurship.idCategories.push(value);
    } else {
      const index = this.entrepreneurship.idCategories.indexOf(value);
      if (index > -1) {
        this.entrepreneurship.idCategories.splice(index, 1);
      }
    }
  }


  onSubmit(): void {
    // Construir el objeto con los datos correctos
    const payload = {
      entrepreneurshipName: this.entrepreneurship.entrepreneurshipName,
      entrepreneurshipDescription: this.entrepreneurship.entrepreneurshipDescription,
      image: this.entrepreneurship.image,
      address: this.entrepreneurship.address,
      idCity: this.entrepreneurship.idCity,
      idUser: this.entrepreneurship.idUser,
      idCategories: this.entrepreneurship.idCategories,
    };

    // Mostrar el payload en la consola para verificar
    console.log('Payload a enviar:', payload);

    // Llamar al servicio para enviar los datos
    this.entrepreneurshipService.createEntrepreneurship(payload).subscribe({
      next: (result) => {
        console.log('Emprendimiento creado con éxito:', result);
        alert('Emprendimiento creado con éxito');
        this.router.navigate(['/']); // Redirigir después de crear
      },
      error: (e) => {
        console.error('Error al crear el emprendimiento:', e);
        alert('Hubo un error al crear el emprendimiento.');
      },
    });
  }



}
