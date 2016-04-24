'use strict';

var animatePercentChange = function animatePercentChange (newPercent, elem) {
      elem = elem || $('.fu-percent span');
      const val = parseInt(elem.text(), 10);

      if(val !== parseInt(newPercent, 10)) {
          let diff = newPercent < val ? -1 : 1;
          elem.text(val + diff);
          setTimeout(animatePercentChange.bind(null, newPercent, elem), 50);
      }
};

$('.fu-progress').on('click', function () {
  const amount = Math.ceil((Math.random() * 100));
  const currentPercent = $('.fu-percent span').text();
  const waterAnimSpeed = (Math.abs(currentPercent - amount) / 50) * 10;
  const waterPercent = 100 - amount;
  animatePercentChange(amount);
  $('.water').css({
    top : waterPercent + '%'
  });
});