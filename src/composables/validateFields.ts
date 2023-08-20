import { toast } from 'vue3-toastify';

export default function  validateFields(params: Record<string, string>): boolean {
  const missingFields: string[] = [];

  for (const field in params) {  
    if (!params[field] || params[field].length === 0) { 
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    missingFields.forEach(missingField => {
      const errorMessage = `Preencha o campo obrigatório: ${missingField}`;
      toast.error(errorMessage, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    });
    return true;
  }

  return false;
}
