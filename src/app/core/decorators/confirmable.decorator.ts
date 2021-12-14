// we are now also importing SweetAlertOptions in our decorator
import Swal, {SweetAlertOptions} from 'sweetalert2';
export function Confirmable(options?: SweetAlertOptions) {
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const config: SweetAlertOptions = {
      title: '¿Esta seguro de eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText:'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'd33',
      confirmButtonText: 'Confirmar',  
    };
    if (options){
      Object.keys(options).forEach( x => config[x] = options[x]);
    }
    descriptor.value = async function (...args) {
      const res = await Swal.fire(config);
      if (res.isConfirmed){
        const result = originalMethod.apply(this, args);
        return result;
      }
    };
    return descriptor;
  };

}