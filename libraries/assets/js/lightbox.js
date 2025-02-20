/*!
 * Lightbox v2.11.4 - FIXED VERSION
 * by Lokesh Dhakar
 * Updated to Fix Centering, Navigation & Undefined Link Error
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      define(['jquery'], factory);
  } else if (typeof exports === 'object') {
      module.exports = factory(require('jquery'));
  } else {
      root.lightbox = factory(root.jQuery);
  }
}(this, function ($) {

  function Lightbox(options) {
      this.album = [];
      this.currentImageIndex = void 0;
      this.init();
      this.options = $.extend({}, this.constructor.defaults);
      this.option(options);
  }

  // Default Lightbox Settings
  Lightbox.defaults = {
      albumLabel: 'Image %1 of %2',
      fadeDuration: 500,
      fitImagesInViewport: true,
      imageFadeDuration: 500,
      positionFromTop: 50,
      resizeDuration: 500,
      showImageNumberLabel: true,
      wrapAround: true,
      disableScrolling: true // Prevent page scrolling when Lightbox is open
  };

  Lightbox.prototype.option = function (options) {
      $.extend(this.options, options);
  };

  Lightbox.prototype.imageCountLabel = function (currentImageNum, totalImages) {
      return this.options.albumLabel.replace(/%1/g, currentImageNum).replace(/%2/g, totalImages);
  };

  Lightbox.prototype.init = function () {
      var self = this;
      $(document).ready(function () {
          self.enable();
          self.build();
      });
  };

  Lightbox.prototype.enable = function () {
      var self = this;
      $('body').on('click', 'a[data-lightbox]', function (event) {
          self.start($(event.currentTarget));
          return false;
      });
  };

  Lightbox.prototype.build = function () {
      if ($('#lightbox').length > 0) {
          return;
      }

      var self = this;

      // Lightbox Structure
      $('<div id="lightboxOverlay" class="lightboxOverlay"></div>' +
          '<div id="lightbox" class="lightbox">' +
          '   <div class="lb-outerContainer">' +
          '       <div class="lb-container">' +
          '           <img class="lb-image" src="" alt="">' +
          '           <div class="lb-nav">' +
          '               <a class="lb-prev" role="button"></a>' +
          '               <a class="lb-next" role="button"></a>' +
          '           </div>' +
          '       </div>' +
          '   </div>' +
          '   <div class="lb-dataContainer">' +
          '       <div class="lb-data">' +
          '           <div class="lb-details">' +
          '               <span class="lb-caption"></span>' +
          '               <span class="lb-number"></span>' +
          '           </div>' +
          '           <div class="lb-closeContainer"><a class="lb-close"></a></div>' +
          '       </div>' +
          '   </div>' +
          '</div>').appendTo($('body'));

      this.$lightbox = $('#lightbox');
      this.$overlay = $('#lightboxOverlay');
      this.$outerContainer = this.$lightbox.find('.lb-outerContainer');
      this.$container = this.$lightbox.find('.lb-container');
      this.$image = this.$lightbox.find('.lb-image');
      this.$nav = this.$lightbox.find('.lb-nav');

      this.$overlay.hide().on('click', function () {
          self.end();
          return false;
      });

      this.$lightbox.hide().on('click', function (event) {
          if ($(event.target).attr('id') === 'lightbox') {
              self.end();
          }
      });

      this.$lightbox.find('.lb-close').on('click', function () {
          self.end();
          return false;
      });

      this.$lightbox.find('.lb-prev').on('click', function () {
          self.changeImage(self.currentImageIndex - 1);
          return false;
      });

      this.$lightbox.find('.lb-next').on('click', function () {
          self.changeImage(self.currentImageIndex + 1);
          return false;
      });

      // Keyboard Navigation
      $(document).on('keyup', function (event) {
          if (event.key === "Escape") self.end();
          if (event.key === "ArrowLeft") self.changeImage(self.currentImageIndex - 1);
          if (event.key === "ArrowRight") self.changeImage(self.currentImageIndex + 1);
      });
  };

  Lightbox.prototype.start = function ($link) {
      var self = this;
      var $window = $(window);
      this.album = [];
      var imageNumber = 0;

      function addToAlbum($link) {
          var href = $link.attr('href');
          if (href) {
              self.album.push({
                  link: href,
                  title: $link.attr('data-title') || $link.attr('title') || ''
              });
          }
      }

      var dataLightboxValue = $link.attr('data-lightbox');
      var $links = $('a[data-lightbox="' + dataLightboxValue + '"]');
      $links.each(function (i) {
          addToAlbum($(this));
          if ($(this)[0] === $link[0]) {
              imageNumber = i;
          }
      });

      if (self.album.length === 0) {
          console.error("Lightbox Error: No valid images found.");
          return;
      }

      console.log("Album Size:", self.album.length); // Debugging

      this.$overlay.fadeIn(this.options.fadeDuration);
      $('body').addClass('lb-disable-scrolling');

      this.changeImage(imageNumber);
  };

  Lightbox.prototype.changeImage = function (imageNumber) {
      var self = this;

      // Validate Index
      if (imageNumber < 0) {
          if (this.options.wrapAround) {
              imageNumber = this.album.length - 1;
          } else {
              console.warn("Lightbox Warning: First image reached.");
              return;
          }
      }
      if (imageNumber >= this.album.length) {
          if (this.options.wrapAround) {
              imageNumber = 0;
          } else {
              console.warn("Lightbox Warning: Last image reached.");
              return;
          }
      }

      var filename = this.album[imageNumber].link;
      if (!filename) {
          console.error("Lightbox Error: Image file not found.");
          return;
      }

      this.currentImageIndex = imageNumber;
      this.$lightbox.fadeIn(this.options.fadeDuration);

      var preloader = new Image();
      preloader.onload = function () {
          self.$image.attr('src', filename);
          self.$image.fadeIn(self.options.imageFadeDuration);
      };
      preloader.src = filename;
  };

  Lightbox.prototype.end = function () {
      this.$overlay.fadeOut(this.options.fadeDuration);
      this.$lightbox.fadeOut(this.options.fadeDuration);
      $('body').removeClass('lb-disable-scrolling');
  };

  return new Lightbox();
}));
