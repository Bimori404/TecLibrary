<template>
  <ion-page style="background: #fff;">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <CatalogoView v-if="$route.params.id === 'Catalogo'" id="CatalogoView" />
        <ContactView v-if="$route.params.id === 'Contacto'" id="ContactView" />
        <!-- <FavoritesView v-if="$route.params.id === 'Favoritos'" id="FavoritesView" /> -->
        <HelpView v-if="$route.params.id === 'Ayuda y Soporte'" id="HelpView" />
        <ReservationsView v-if="$route.params.id === 'Prestamos y Reservas'" id="ReservationsView" />
      </div>

    </ion-content>
  </ion-page>
</template>

<script>
import CatalogoView from './Catalog.vue';
import ContactView from './Contact.vue';
// import FavoritesView from './Favorites.vue';
import HelpView from './Help.vue';
import ReservationsView from './Reservations.vue';

export default {
  name: 'FolderPage',
  components: {
    CatalogoView,
    ContactView,
    // FavoritesView,
    HelpView,
    ReservationsView
  }
};
</script>

<style scoped>
#container {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  /* Ajusta este valor según tus necesidades */
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

@media screen and (min-width: 393px) {
  #CatalogoView {
    margin-top: 5px;
    margin-left: 15%;
    margin-right: 15%;
    margin-bottom: 20%;
    /* border: solid rgb(251, 255, 0) 1px; */
  }

  #ContactView {
    margin-top: 2px;
    margin-left: 15%;
    margin-right: 15%;
    margin-bottom: 20%;
    /* border: solid rgb(251, 255, 0) 1px; */
  }
  #HelpView {
    margin-top: 2px;
    margin-left: 15%;
    margin-right: 15%;
    margin-bottom: 20%;
    /* border: solid rgb(251, 255, 0) 1px; */
  }
  #ReservationsView {
    margin-top: 2px;
    margin-left: 15%;
    margin-right: 15%;
    margin-bottom: 20%;
    /* border: solid rgb(251, 255, 0) 1px; */
  }
}
</style>
