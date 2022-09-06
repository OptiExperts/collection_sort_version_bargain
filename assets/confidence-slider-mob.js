 // Slide every slideDelay seconds
      const slideDelay = 3000; 

      const dynamicSlider = document.getElementById("slider");

      var curSlide = 0;
      window.setInterval(()=>{
        curSlide++;
        if (curSlide === dynamicSlider.childElementCount) {
          curSlide = 0;
        }

        // Actual slide
        dynamicSlider.firstElementChild.style.setProperty("margin-left", "-" + curSlide + "00%");
      }, slideDelay);