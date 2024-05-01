//RATING DE ESTRELLAS

const stars = document.querySelectorAll('.rating input');
const ratingStars = document.querySelector('.stars');
const ratingValue = document.querySelector('.rating-value');
const result = document.querySelector('.result');

stars.forEach(star => star.addEventListener('change', function() {
  const rating = this.value;
  result.textContent = 'Gracias por tu calificación: ' + rating + ' estrella(s)';
  ratingValue.textContent = rating;
  ratingStars.textContent = '★'.repeat(rating);
  ratingStars.style.color = 'orange';
}));
