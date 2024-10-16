<template>
    <pre>{{jsondata}}</pre>
</template>

<script>
import axios from 'axios';

export default {
    name:'GetAllBookAPI',
    data(){
        return {
            jsondata: null,
            error: null,
        };
    },
    methods:{
        async getBooksAPI(){
            try{
                const response = await axios.get('https://us-central1-week7-yaoyan.cloudfunctions.net/getBooks');
                console.log(response);
                this.jsondata = response.data;
                this.error = null;
            }catch(error){
                console.error('Error fetching book count:',error);
                this.error = error;
                this.jsondata = null;
            }
        }
    },
    mounted(){
        this.getBooksAPI()
    }
}
</script>