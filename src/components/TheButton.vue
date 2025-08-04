<template>
  <button class="py-3 px-8">
    <span><slot></slot></span>
  </button>
</template>

<style scoped>
button{
  overflow: hidden;
  cursor: pointer;
  border-radius: 10px;
  background: #AB577A;
}

button::before,
button::after {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

button span {
	position: relative;
  color: black;
  transition: 0.3s all;
}

button::before {
	content: '';
	background: #EACACB;
	transition: transform 0.3s cubic-bezier(0.7, 0, 0.2, 1);
}

button:hover::before {
	transform: translate3d(100%,0,0);
}
button:hover span{
  color: white;
}
</style>
