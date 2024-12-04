import { Component } from '@angular/core';
import { City, CityService } from '../../services/city.service';
import { User, UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  cities: City[] = [];
  errorMessage: string = '';

  user: User = {
    idUser: 0,
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    userPassword: "",
    idCity: 0,
    idRoles: [2],

    nameCity: "",
  }

  constructor(private userService: UserService, private cityService: CityService, private router: Router) { }

  ngOnInit(): void {
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


  // Maneja el envío del formulario para crear un nuevo usuario
  onSubmit(): void {

    // Construir el objeto payload con los datos necesarios para el servicio
    const payload = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      mobile: this.user.mobile,
      userPassword: this.user.mobile,
      idCity: this.user.idCity,
      idRoles: this.user.idRoles
    };
    // Mostrar el objeto payload en la consola para depuración
    console.log('Payload a enviar:', payload);

    // Llamar al servicio para enviar los datos del nuevo usuario
    this.userService.createUser(payload).subscribe({
      // Manejo de la respuesta exitosa del servicio
      next: (result) => {
        console.log('Usuario creado con éxito:', result);
        alert('Usuario creado con éxito');
        // Limpiar los campos del formulario
        this.user = {
          idUser: 0,
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          userPassword: "",
          idCity: 0,
          idRoles: [2],

          nameCity: "",
        };
      },
      // Manejo de errores en caso de que falle la creación del usuario
      error: (e) => {
        console.error('Error al crear el usuario:', e);
        alert('Hubo un error al crear el usuario.');
      },
    });
  }

}
