<template>
        <div id="profile-image-upload">
        <div class="img-container">
            <img :src="src ? src : defaultSrc" alt="">
        </div>
        <div class="btn-container">
            <div class="btn-group">
            <a class="btn" @click="takePicture">{{ $t('profile.form.take_picture') }}</a>
            <a class="btn" @click="deleteImage">{{ $t('profile.form.remove_image') }}</a>
            </div>
        </div>
    </div>
</template>

<script>

import { storage } from '../main';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IonButton }from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        IonButton
    },
    props: {
        src: {
            type: String
        },
    },
    data() {
        return {
            defaultSrc: require('../../public/customer_default.jpg')
        }
    },
    methods: {
        async takePicture(){
            console.log(this);
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Base64
            });
            if (image?.base64String) {
                // Get current user
                // const user = auth.currentUser;
                const customerId = '62080fa00ae8f9fea7e93bbb';
                const filePath   = `images/${customerId}.${image.format}`;
                const storageRef = storage.ref();

                await storageRef
                    .child(filePath)
                    .putString(image.base64String, 'base64');

                const url = await storageRef.child(filePath).getDownloadURL();

                console.log(this);
                console.log(url);
                // console.log(loc.coords);
                this.$emit('update-photo', url)
            }
        },
        deleteImage() {
            
        }
    },
});
</script>

<style scoped>
    #profile-image-upload {
    display: flex;
    margin: var(--big-distance) auto;
    justify-content: space-between;
    max-width: 500px;
    box-sizing: content-box;
  }

  #profile-image-upload .btn-container {
    flex: 1;
    position: relative;
    margin-left: var(--small-distance);
  }

  #profile-image-upload .btn-group {
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }

 #profile-image-upload .btn-group .btn {
    margin: var(--small-distance) 0;
  }

  #profile-image-upload .img-container {
      flex: 1;
      text-align: center;
      position: relative
  }

  #profile-image-upload img {
    border-radius: 100%;
    max-height: 200px;
    max-width: 200px;
    width: 45vw;
    height: 45vw;
    object-fit: cover;
  }

</style>