import { useState, useEffect, createContext, useContext } from 'react';

const I18nContext = createContext();

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get from localStorage or browser language
    const saved = localStorage.getItem('language');
    if (saved) return saved;
    
    const browserLang = navigator.language.split('-')[0];
    return ['es', 'en'].includes(browserLang) ? browserLang : 'es';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: (key) => translate(key, language)
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

const translate = (key, language) => {
  const keys = key.split('.');
  let value = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};

const translations = {
  es: {
    common: {
      loading: 'Cargando...',
      error: 'Error',
      close: 'Cerrar',
      submit: 'Enviar',
      select: 'Seleccionar',
      required: 'Requerido'
    },
    banner: {
      title: 'Cine Tico',
      titleAccessible: 'Cine Tico',
      menu: 'Menú'
    },
    form: {
      title: 'Formulario de Registro',
      name: 'Nombre',
      nameHint: 'Ingrese exactamente 4 letras.',
      nameHintEnter: 'Para continuar digite Enter.',
      nameError: 'El nombre tiene errores, por favor corregir',
      nameErrorAccessible: 'El nombre debe contener exactamente 4 letras',
      password: 'Nuevo Password',
      passwordHint: 'Los primeros 3 caracteres deben ser números consecutivos (ej: 123, 321).',
      passwordHintEnter: 'Para continuar digite Enter.',
      passwordError: 'El nuevo password tiene errores, por favor corregir',
      passwordErrorAccessible: 'El password debe comenzar con 3 dígitos consecutivos (ascendente o descendente)',
      province: 'Cine de su preferencia',
      provinceError: 'El cine tiene errores, por favor corregir',
      provinceErrorAccessible: 'Debe seleccionar un cine',
      date: 'Fecha',
      dateError: 'La fecha tiene errores, por favor corregir',
      dateErrorAccessible: 'Debe seleccionar una fecha',
      selectedDate: 'Fecha seleccionada',
      noDate: 'Ninguna'
    },
    movie: {
      selected: 'Película Seleccionada',
      description: 'Descripción',
      cast: 'Reparto',
      director: 'Director',
      actor: 'Actor',
      selectMovie: 'Selección de películas',
      genre: 'Género',
      movieLabel: 'Película'
    },
    provinces: {
      default: 'Seleccione una provincia',
      'san-jose': 'San José',
      'alajuela': 'Alajuela',
      'cartago': 'Cartago',
      'heredia': 'Heredia',
      'guanacaste': 'Guanacaste',
      'puntarenas': 'Puntarenas',
      'limon': 'Limón'
    },
    months: {
      0: 'Enero',
      1: 'Febrero',
      2: 'Marzo',
      3: 'Abril',
      4: 'Mayo',
      5: 'Junio',
      6: 'Julio',
      7: 'Agosto',
      8: 'Septiembre',
      9: 'Octubre',
      10: 'Noviembre',
      11: 'Diciembre'
    },
    days: {
      short: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      long: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    },
    datePicker: {
      prevMonth: 'Mes anterior',
      nextMonth: 'Mes siguiente',
      today: 'hoy',
      otherMonth: 'mes diferente'
    },
    dialog: {
      successTitle: 'Registrado con éxito',
      movieSection: 'Película Seleccionada',
      name: 'Nombre',
      province: 'Cine de su preferencia',
      date: 'Fecha'
    },
    home: {
      title: 'Bienvenido a Cine Tico',
      description: 'Sistema de reservas de entradas de cine',
      withoutAccessibility: 'Ir al Sistema de Reservas (Sin Accesibilidad)',
      withAccessibility: 'Ir al Sistema de Reservas (Con Accesibilidad)'
    },
    language: {
      select: 'Idioma',
      spanish: 'Español',
      english: 'English'
    },
    movies: {
      'aqui-y-ahora': {
        title: 'Aquí y ahora',
        description: 'Una emotiva historia sobre la importancia de vivir el presente y valorar cada momento con nuestros seres queridos. Una reflexión profunda sobre la vida, la familia y el tiempo.'
      },
      'clara-sola': {
        title: 'Clara Sola',
        description: 'La historia de una mujer que busca su independencia y autodescubrimiento en un entorno rural lleno de tradiciones. Un drama íntimo y poderoso sobre la liberación personal.'
      },
      'cascos-indomables': {
        title: 'Cascos Indomables',
        description: 'Una divertida comedia sobre un grupo de motociclistas que deben enfrentar desafíos inesperados en su aventura por las carreteras. Risas garantizadas en cada kilómetro.'
      },
      'por-las-plumas': {
        title: 'Por las plumas',
        description: 'Una comedia ligera y familiar sobre las aventuras de un grupo de amigos que deciden abrir una granja avícola. Momentos divertidos y situaciones inesperadas los esperan.'
      },
      'orbita-prima': {
        title: 'Órbita Prima',
        description: 'Una épica aventura espacial que nos lleva a explorar nuevos mundos y civilizaciones. Una historia de supervivencia, descubrimiento y la búsqueda de un nuevo hogar para la humanidad.'
      }
    },
    genres: {
      'Drama': 'Drama',
      'Comedia': 'Comedia',
      'Ciencia ficción': 'Ciencia ficción'
    }
  },
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      close: 'Close',
      submit: 'Submit',
      select: 'Select',
      required: 'Required'
    },
    banner: {
      title: 'Tico Movies',
      titleAccessible: 'Tico Movies',
      menu: 'Menu'
    },
    form: {
      title: 'Registration Form',
      name: 'Name',
      nameHint: 'Enter exactly 4 letters.',
      nameHintEnter: 'Press Enter to continue.',
      nameError: 'The name has errors, please correct',
      nameErrorAccessible: 'The name must contain exactly 4 letters',
      password: 'New Password',
      passwordHint: 'The first 3 characters must be consecutive numbers (e.g., 123, 321).',
      passwordHintEnter: 'Press Enter to continue.',
      passwordError: 'The new password has errors, please correct',
      passwordErrorAccessible: 'The password must start with 3 consecutive digits (ascending or descending)',
      province: 'Preferred Cinema',
      provinceError: 'The cinema has errors, please correct',
      provinceErrorAccessible: 'You must select a cinema',
      date: 'Date',
      dateError: 'The date has errors, please correct',
      dateErrorAccessible: 'You must select a date',
      selectedDate: 'Selected date',
      noDate: 'None'
    },
    movie: {
      selected: 'Selected Movie',
      description: 'Description',
      cast: 'Cast',
      director: 'Director',
      actor: 'Actor',
      selectMovie: 'Movie selection',
      genre: 'Genre',
      movieLabel: 'Movie'
    },
    provinces: {
      default: 'Select a province',
      'san-jose': 'San José',
      'alajuela': 'Alajuela',
      'cartago': 'Cartago',
      'heredia': 'Heredia',
      'guanacaste': 'Guanacaste',
      'puntarenas': 'Puntarenas',
      'limon': 'Limón'
    },
    months: {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December'
    },
    days: {
      short: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    datePicker: {
      prevMonth: 'Previous month',
      nextMonth: 'Next month',
      today: 'today',
      otherMonth: 'different month'
    },
    dialog: {
      successTitle: 'Successfully Registered',
      movieSection: 'Selected Movie',
      name: 'Name',
      province: 'Preferred Cinema',
      date: 'Date'
    },
    home: {
      title: 'Welcome to Cine Tico',
      description: 'Cinema ticket booking system',
      withoutAccessibility: 'Go to Booking System',
      withAccessibility: 'Go to Booking System'
    },
    language: {
      select: 'Language',
      spanish: 'Español',
      english: 'English'
    },
    movies: {
      'aqui-y-ahora': {
        title: 'Here and Now',
        description: 'A touching story about the importance of living in the present and cherishing every moment with our loved ones. A deep reflection on life, family, and time.'
      },
      'clara-sola': {
        title: 'Clara Alone',
        description: 'The story of a woman seeking her independence and self-discovery in a rural environment full of traditions. An intimate and powerful drama about personal liberation.'
      },
      'cascos-indomables': {
        title: 'Indomitable Helmets',
        description: 'A fun comedy about a group of motorcyclists who must face unexpected challenges on their road adventure. Guaranteed laughs at every kilometer.'
      },
      'por-las-plumas': {
        title: 'For the Feathers',
        description: 'A light and family-friendly comedy about the adventures of a group of friends who decide to open a poultry farm. Funny moments and unexpected situations await them.'
      },
      'orbita-prima': {
        title: 'Prime Orbit',
        description: 'An epic space adventure that takes us to explore new worlds and civilizations. A story of survival, discovery, and the search for a new home for humanity.'
      }
    },
    genres: {
      'Drama': 'Drama',
      'Comedia': 'Comedy',
      'Ciencia ficción': 'Science Fiction'
    }
  }
};

export default translations;
