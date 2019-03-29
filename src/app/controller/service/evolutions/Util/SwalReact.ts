// use the function to generate Swal reactions
// please don't modify this code
//feel free to copy and adapt the function with your own reactions
//Xrio


export function getReact(subject: string, gender: boolean) {
  let SUCCESS_CREATE;
  let SUCCESS_EDIT;
  let SUCCESS_DELETE;

  let DELETE_CONFIRMATION;

  let SEARCH_NOT_FOUND;

  let ERROR_REF_ALREADY_EXISTS;
  let ERROR_REF_DOES_NOT_EXIST;
  let ERROR_INVALID_REF;
  let ERROR_NOT_ENOUGH_DATA;
  let ERROR_UNKNOWN_ERROR;

  if (gender) {
    SUCCESS_CREATE = {
      title: 'Succès !',
      text: subject + ' créee avec succès',
      type: 'success',
      confirmButtonText: 'ok'
    };
  } else {
    SUCCESS_CREATE = {
      title: 'Succès !',
      text: subject + ' crée avec succès',
      type: 'success',
      confirmButtonText: 'ok'
    };
  }
  if (gender) {
    SUCCESS_EDIT = {
      title: 'succès',
      text: subject + ' modifiée avec succès',
      type: 'success',
      confirmButtonText: 'ok'
    };
  } else {
    SUCCESS_EDIT = {
      title: 'succès',
      text: subject + ' modifié avec succès',
      type: 'success',
      confirmButtonText: 'ok'
    };
  }
  if (gender) {
    SUCCESS_DELETE = {
      title: 'succès',
      text: subject + ' supprimée avec succès',
      type: 'success',
      confirmButtonText: 'ok'
    }
  } else {
    SUCCESS_DELETE = {
      title: 'succès',
      text: subject + ' supprimé avec succès',
      type: 'success',
      confirmButtonText: 'ok'
    };
  }

  DELETE_CONFIRMATION = {
    title: 'Etes vous sûre?',
    text: "Vous ne pourrez pas revenir en arrière!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, je confirme',
    cancelButtonText : 'Annuler'
  };

  ERROR_REF_ALREADY_EXISTS = {
    title: 'Erreur !',
    text: 'Référence existe déjà',
    type: 'error',
    confirmButtonText: 'ok'
  };

  ERROR_REF_DOES_NOT_EXIST = {
    title: 'Erreur !',
    text: 'Référence n\'existe pas',
    type: 'error',
    confirmButtonText: 'ok'
  };
  ERROR_INVALID_REF = {
    title: 'Erreur !',
    text: 'Référence invalide',
    type: 'error',
    confirmButtonText: 'ok'
  };
  ERROR_NOT_ENOUGH_DATA = {
    title: 'Erreur !',
    text: 'Insuffisance de données',
    type: 'error',
    confirmButtonText: 'ok'
  };
  ERROR_UNKNOWN_ERROR = {
    title: 'Erreur !',
    text: 'Erreur inconnue',
    type: 'error',
    confirmButtonText: 'ok'
  };
  SEARCH_NOT_FOUND = {
    title: 'Resultat !',
    text: 'Aucune occurrence trouvée',
    type: 'warning',
    toast : true,
    timer: 1200,
    position : 'top-right',
    confirmButtonText: 'ok'
  };


  return {
    'SUCCESS_CREATE': SUCCESS_CREATE,
    'SUCCESS_EDIT': SUCCESS_EDIT,
    'SUCCESS_DELETE': SUCCESS_DELETE,
    'CONFIRMATION_DELETE_CONFIRMATION' : DELETE_CONFIRMATION,
    'SEARCH_NOT_FOUND' : SEARCH_NOT_FOUND,
    'ERROR_REF_ALREADY_EXISTS': ERROR_REF_ALREADY_EXISTS,
    'ERROR_REF_DOES_NOT_EXIST': ERROR_REF_DOES_NOT_EXIST,
    'ERROR_INVALID_REF': ERROR_INVALID_REF,
    'ERROR_NOT_ENOUGH_DATA': ERROR_NOT_ENOUGH_DATA,
    'ERROR_UNKNOWN_ERROR': ERROR_UNKNOWN_ERROR
  }
}



