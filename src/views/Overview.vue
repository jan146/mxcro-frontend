<template>
  <div class="about">
      <h1>This is the overview page for user with user_id: {{$route.params.user_id}}</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
