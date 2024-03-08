import {AuthenticationComponent} from '@loopback/authentication';
import {
  JWTAuthenticationComponent,
  UserServiceBindings
} from '@loopback/authentication-jwt';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings, RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {DbDataSource} from './datasources';
import {JWTService} from './services/jwt-service';
import {MyUserService} from './services/user-service';
export {ApplicationConfig};
export class Lb4SmcrudApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));


    // this.bind(UserServiceBindings.USER_REPOSITORY)
    // .toClass(
    //   UserRepository,
    //   );


      this.component(AuthenticationComponent);
      // Mount jwt component
      this.component(JWTAuthenticationComponent);
      // Bind datasource
      this.dataSource(DbDataSource, UserServiceBindings.DATASOURCE_NAME);

      this.bind('authentication.jwt.secret').to('1234asdf5');
      this.bind('authentication.jwt.expiry').to('24h');

      this.bind('services.user.service').toClass(MyUserService);

      this.bind('services.jwt.service').toClass(JWTService);

      // this.sequence(MySequence);




    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };


  }

  // SetupBinding(): void{
  //   this.bind('services.user.service').toClass(MyUserService)
  // }
}
