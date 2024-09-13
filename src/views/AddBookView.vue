<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">Add Book</h1>
                <form @submit.prevent="addBook">
                    <div class="row mb-3">
                        <label for="isbn" class="form-label">ISBN:</label>
                        <input
                        type="text"
                        class="form-control"
                        id="isbn"
                        v-model="isbn" required
                        @blur="() => validateIsbn(true)"
                        @input="() => validateIsbn(false)"
                      />
                      <div v-if="errors.isbn" class="text-danger">
                        {{ errors.isbn }}
                      </div>
                    </div>
                    <div class="row mb-3">
                        <label for="name" class="form-label">Name:</label>
                        <input
                        type="text"
                        class="form-control"
                        v-model="name" required
                        />
                    </div>
                    
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Add Book</button>
                    </div>
                </form>
            </div>
        </div>  
    </div>
</template>

<script>
import { db } from '@/firebase/init';
import { collection, addDoc } from 'firebase/firestore';

export default {
    data(){
        return {
            isbn: '',
            name: '',

            errors:{
                isbn: null
            }
        }
    },
    methods: {
        async addBook(){
            try{
                const isbnNum = Number(this.isbn);
                if (isNaN(isbnNum)) alert('ISBN must be a valid number');

                await addDoc(collection(db,'books'),{
                    isbn: isbnNum,
                    name: this.name
                })
            }catch(error){
                console.error('Error adding book: ',error);
            }
        }
        ,
        validateIsbn(blur){
            const isbnNum = Number(this.isbn);
                if (isNaN(isbnNum) && blur) alert('ISBN must be a valid number');
        }
    }
}

</script>