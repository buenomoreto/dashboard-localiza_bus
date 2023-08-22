import { toast } from 'vue3-toastify';
import { useWindowSize } from '@/stores';

export default function  useuseValidateFields(params: Record<string, string>): boolean {
  const missingFields: string[] = [];
  const windowSize = useWindowSize();

  for (const field in params) {  
    if (!params[field] || params[field].length === 0) { 
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    if(windowSize.screenWidth > 1024) {
      missingFields.forEach(missingField => {
        const errorMessage = `Preencha o campo obrigatório: ${missingField}`;
        toast.error(errorMessage, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
    } else {
      toast.error('Preencha os campos obrigatórios', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    return true;
  }

  return false;
}
