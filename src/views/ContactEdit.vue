<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ContactForm from '@/components/ContactForm.vue';
import contactsService from '@/services/contacts.service';
const props = defineProps({
    contactId: { type: String, required: true },
});
const $router = useRouter();
const $route = useRoute();
const contact = ref(null);
const message = ref('');
async function getContact(id) {
    try {
        contact.value = await contactsService.getContact(id);
    } catch (error) {
        console.log(error);
        // Redirect to NotFound page and keep URL intact
        $router.push({
            name: 'notfound',
            params: { pathMatch: $route.path.split('/').slice(1) },
            query: $route.query,
            hash: $route.hash,
        });
    }
}
async function onUpdateContact(editedContact) {
    try {
        await contactsService.updateContact(editedContact.id, editedContact);
        message.value = 'Liên hệ được cập nhật thành công.';
    } catch (error) {
        console.log(error);
    }
}
async function onDeleteContact(id) {
    if (confirm('Bạn muốn xóa Liên hệ này?')) {
        try {
            await contactsService.deleteContact(id);
            $router.push({ name: 'contactbook' });
        } catch (error) {
            console.log(error);
        }
    }
}
getContact(props.contactId);
</script>
<template>
    <div v-if="contact" class="page">
        <h4>Hiệu chỉnh Liên hệ</h4>
        <ContactForm :initial-contact="contact" @submit:contact="onUpdateContact" @delete:contact="onDeleteContact" />
        <p>{{ message }}</p>
    </div>
</template>
