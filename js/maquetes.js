// Script específico para a página de maquetes
document.addEventListener('DOMContentLoaded', function() {
    // Efeito de parallax na hero section
    const heroContent = document.querySelectorAll('.hero-content-text');
    
    window.addEventListener("scroll", function() {
        if (window.innerWidth > 768) {
            let scrollY = window.scrollY;
            
            // Aplica efeito parallax nos textos do hero
            for (let i = 0; i < heroContent.length; i++) {
                heroContent[i].style.transform = `translateY(${scrollY * 0.2}px)`;
            }
        }
    });
    
    // Animação das imagens na galeria
    const imageCards = document.querySelectorAll('.image-card');
    
    // Função para verificar se um elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Função para adicionar classe de animação aos elementos visíveis
    function animateOnScroll() {
        imageCards.forEach(card => {
            if (isElementInViewport(card)) {
                card.classList.add('visible');
            }
        });
    }
    
    // Animar elementos visíveis no carregamento
    window.addEventListener('load', animateOnScroll);
    
    // Animar elementos ao rolar a página
    window.addEventListener('scroll', animateOnScroll);
    
    // Adiciona evento de hover para exibir detalhes das imagens (simulado)
    imageCards.forEach(card => {
        card.addEventListener('mouseover', function() {
            // Aqui você pode adicionar lógica para exibir mais detalhes sobre a imagem
            // Por exemplo, mostrar uma descrição mais completa
        });
    });
});// JavaScript para a nova seção de galeria de maquetes
document.addEventListener("DOMContentLoaded", function() {
    // Filtros da galeria
    const filterButtons = document.querySelectorAll('.filter-btn');
    const showcaseItems = document.querySelectorAll('.showcase-item');
    const sliderItems = document.querySelectorAll('.slider-item');
    
    // Função para filtrar os itens
    function filterItems(category) {
      // Filtra itens da grade principal
      showcaseItems.forEach(item => {
        if (category === 'all') {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 100);
        } else if (item.classList.contains(category)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 100);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
      
      // Filtra itens do slider
      sliderItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
    
    // Adiciona event listener aos botões de filtro
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove classe ativa de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Adiciona classe ativa ao botão clicado
        button.classList.add('active');
        
        // Filtra os itens com base na categoria
        const category = button.getAttribute('data-filter');
        filterItems(category);
      });
    });
    
    // Controles do slider
    const sliderTrack = document.querySelector('.slider-track');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const sliderItems2 = document.querySelectorAll('.slider-item');
    
    let itemWidth = 270; // Largura do item + gap
    
    // Função para rolar o slider
    function scrollSlider(direction) {
      const scrollAmount = direction === 'prev' ? -itemWidth * 3 : itemWidth * 3;
      sliderTrack.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
    
    // Event listeners para as setas do slider
    prevArrow.addEventListener('click', () => scrollSlider('prev'));
    nextArrow.addEventListener('click', () => scrollSlider('next'));
    
    // Atualiza o valor de itemWidth em dispositivos móveis
    function updateItemWidth() {
      if (window.innerWidth <= 576) {
        itemWidth = 220; // Menor em dispositivos móveis (200px + 20px gap)
      } else {
        itemWidth = 270; // Padrão (250px + 20px gap)
      }
    }
    
    // Atualiza o itemWidth ao redimensionar a janela
    window.addEventListener('resize', updateItemWidth);
    updateItemWidth(); // Inicializa com o valor correto
    
    // Contador crescente para estatísticas
    const counters = document.querySelectorAll('.counter-number');
    
    function startCounting() {
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 segundos
        let startTime = null;
        const startValue = 0;
        
        function updateCounter(timestamp) {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;
          const percentage = Math.min(progress / duration, 1);
          
          const currentValue = Math.floor(percentage * (target - startValue) + startValue);
          counter.textContent = currentValue;
          
          if (percentage < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        }
        
        requestAnimationFrame(updateCounter);
      });
    }
    
    // Inicia o contador quando a seção estiver visível
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounting();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    const counterSection = document.querySelector('.showcase-counter');
    if (counterSection) {
      observer.observe(counterSection);
    }
    
    // Efeito de animação ao scroll para os itens da galeria
    function animateOnScroll() {
      const elements = document.querySelectorAll('.showcase-item, .featured-item');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = elementTop < window.innerHeight && elementBottom > 0;
        
        if (isVisible) {
          element.classList.add('show-element');
        }
      });
    }
    
    // Adiciona classe de estilo para animação ao scroll
    const style = document.createElement('style');
    style.innerHTML = `
      .showcase-item, .featured-item {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .show-element {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
    
    // Adiciona listeners para animação no scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Efeito de hover para itens da grade
    showcaseItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        const overlay = this.querySelector('.showcase-overlay');
        if (overlay) {
          overlay.style.transform = 'translateY(0)';
        }
      });
      
      item.addEventListener('mouseleave', function() {
        const overlay = this.querySelector('.showcase-overlay');
        if (overlay) {
          overlay.style.transform = 'translateY(100%)';
        }
      });
    });
    
    // Efeito de hover para itens do slider
    sliderItems.forEach(item => {
      const imgContainer = item.querySelector('.slider-img-container');
      const caption = item.querySelector('.slider-caption');
      
      imgContainer.addEventListener('mouseenter', function() {
        caption.style.transform = 'translateY(0)';
      });
      
      imgContainer.addEventListener('mouseleave', function() {
        caption.style.transform = 'translateY(100%)';
      });
    });
    
    // Inicializa os filtros com "all" ativo por padrão
    const activeFilter = document.querySelector('.filter-btn.active');
    if (activeFilter) {
      const defaultCategory = activeFilter.getAttribute('data-filter');
      filterItems(defaultCategory);
    } else {
      // Caso não haja filtro ativo, ativa o primeiro (all)
      const firstFilter = document.querySelector('.filter-btn[data-filter="all"]');
      if (firstFilter) {
        firstFilter.classList.add('active');
        filterItems('all');
      }
    }
    
    // Detectar quando o slider chega ao fim ou início para desabilitar os botões de navegação
    function updateSliderArrows() {
      const scrollPosition = sliderTrack.scrollLeft;
      const maxScroll = sliderTrack.scrollWidth - sliderTrack.clientWidth;
      
      // Desabilita/habilita botões de acordo com a posição
      if (scrollPosition <= 0) {
        prevArrow.classList.add('disabled');
      } else {
        prevArrow.classList.remove('disabled');
      }
      
      if (scrollPosition >= maxScroll - 5) { // 5px de tolerância
        nextArrow.classList.add('disabled');
      } else {
        nextArrow.classList.remove('disabled');
      }
    }
    
    // Adiciona estilo para botões desabilitados
    const arrowStyle = document.createElement('style');
    arrowStyle.innerHTML = `
      .slider-arrow.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `;
    document.head.appendChild(arrowStyle);
    
    // Inicializa e atualiza as setas quando necessário
    sliderTrack.addEventListener('scroll', updateSliderArrows);
    window.addEventListener('resize', updateSliderArrows);
    setTimeout(updateSliderArrows, 100); // Verifica após carregamento inicial
    
    // Inicializa a animação nos itens visíveis inicialmente
    animateOnScroll();
});