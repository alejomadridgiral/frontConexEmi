import { Component, Input } from '@angular/core';
import { CreateEntrepreneurship, Entrepreneurship, EntrepreneurshipService } from '../../services/entrepreneurship.service';
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

  categories: Category[] = [];
  cities: City[] = [];
  errorMessage: string = '';

  entrepreneurship: Entrepreneurship = {
    idEntrepreneurship: 0,
    entrepreneurshipName: "",
    entrepreneurshipDescription: "",
    image: "",
    address: "",
    idCity: 0,
    idUser: 0,
    idCategories: [],

    nameCity: "",
    user: "",
    nameCategories: [],
    comments: [],
    totalComments: 0,
    totalReactions: 0,
  }

  constructor(private entrepreneurshipService: EntrepreneurshipService, private categoryService: CategoryService,
    private cityService: CityService, private router: Router) { }


  ngOnInit(): void {
    // Solicitar todas las categorías al servicio
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        // Asignar las categorías recibidas a la variable local y ordenarlas por ID
        this.categories = data.sort((a, b) => a.idCategory - b.idCategory);
      },
      (error) => {
        this.errorMessage = 'Error al obtener las categorías';
        console.error(error);
      }
    );
    // Solicitar todas las ciudades al servicio
    this.cityService.getAllCities().subscribe(
      (data) => {
        // Asignar las ciudades recibidas a la variable local y ordenarlas por ID
        this.cities = data.sort((a, b) => a.idCity - b.idCity);
      },
      (error) => {
        this.errorMessage = 'Error al obtener las ciudades';
        console.error(error);
      }
    );
  }


  // Maneja el cambio de estado de un checkbox.
  onCheckboxChange(event: Event): void {
    // Obtener el checkbox que disparó el evento y convertir su valor a un número
    const checkbox = event.target as HTMLInputElement;
    const value = parseInt(checkbox.value, 10); // Convertir el valor del checkbox a entero

    // Verificar si el checkbox está marcado
    if (checkbox.checked) {
      // Agregar el valor al arreglo de categorías seleccionadas
      this.entrepreneurship.idCategories.push(value);
    } else {
      // Buscar el índice del valor en el arreglo
      const index = this.entrepreneurship.idCategories.indexOf(value);
      if (index > -1) {
        // Eliminar el valor del arreglo si existe
        this.entrepreneurship.idCategories.splice(index, 1);
      }
    }
  }


  // Maneja el envío del formulario para crear un nuevo emprendimiento
  onSubmit(): void {

    // Construir el objeto payload con los datos necesarios para el servicio
    const payload = {
      entrepreneurshipName: this.entrepreneurship.entrepreneurshipName,
      entrepreneurshipDescription: this.entrepreneurship.entrepreneurshipDescription,
      image: this.entrepreneurship.image,
      address: this.entrepreneurship.address,
      idCity: this.entrepreneurship.idCity,
      idUser: this.getRandomUserId(),
      idCategories: this.entrepreneurship.idCategories,
    };
    // Mostrar el objeto payload en la consola para depuración
    console.log('Payload a enviar:', payload);

    // Llamar al servicio para enviar los datos del nuevo emprendimiento
    this.entrepreneurshipService.createEntrepreneurship(payload).subscribe({
      // Manejo de la respuesta exitosa del servicio
      next: (result) => {
        console.log('Emprendimiento creado con éxito:', result);
        alert('Emprendimiento creado con éxito');
        // Limpiar los campos del formulario
        this.entrepreneurship = {
          idEntrepreneurship: 0,
          entrepreneurshipName: "",
          entrepreneurshipDescription: "",
          image: "",
          address: "",
          idCity: 0,
          idUser: 0,
          idCategories: [],

          nameCity: "",
          user: "",
          nameCategories: [],
          comments: [],
          totalComments: 0,
          totalReactions: 0,
        };
      },
      // Manejo de errores en caso de que falle la creación de la publicacion
      error: (e) => {
        console.error('Error al crear el emprendimiento:', e);
        alert('Hubo un error al crear el emprendimiento.');
      },
    });
  }


  // Función temporal para generar un ID de usuario aleatorio.
  private getRandomUserId(): number {
    // Genera un número aleatorio entre 0 (inclusive) y 1 (no inclusivo), lo multiplica por 10,
    // redondea hacia abajo para obtener un entero, y luego le suma 1 para que el rango sea de 1 a 10.
    return Math.floor(Math.random() * 10) + 1;
  }


}
