<script setup>
import { ref, computed, onMounted, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import ContactCard from '@/components/ContactCard.vue';
import InputSearch from '@/components/InputSearch.vue';
import ContactList from '@/components/ContactList.vue';
import Pagination from '@/components/Pagination.vue';
import contactsService from '@/services/contacts.service';

const $router = useRouter();
const totalPages = ref(1);
const currentPage = ref(1);
const contacts = ref([]);
const selectedIndex = ref(-1);
const searchText = ref('');
// Map each contact to a string for searching
const searchableContacts = computed(() =>
    contacts.value.map((contact) => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join('');
    })
);
// Contacts filtered by searchText
const filteredContacts = computed(() => {
    if (!searchText.value) return contacts.value;
    return contacts.value.filter((contact, index) =>
        searchableContacts.value[index].includes(searchText.value)
    );
});
const selectedContact = computed(() => {
    if (selectedIndex.value < 0) return null;
    return filteredContacts.value[selectedIndex.value];
});
// Get contacts for a specific pages and order them by name
async function retrieveContacts(page) {
    try {
        const chunk = await contactsService.getContacts(page);
        totalPages.value = chunk.metadata.lastPage ?? 1;
        contacts.value = chunk.contacts.sort((current, next) =>
            current.name.localeCompare(next.name)
        );
        selectedIndex.value = -1;
    } catch (error) {
        console.log(error);
    }
}
// Handle delete all contacts event
async function onDeleteContacts() {
    if (confirm('Bạn muốn xóa tất cả Liên hệ?')) {
        try {
            await contactsService.deleteAllContacts();
            totalPages.value = 1;
            currentPage.value = 1;
            contacts.value = [];
            selectedIndex.value = -1;
        } catch (error) {
            console.log(error);
        }
    }
}
function goToAddContact() {
    $router.push({ name: 'contact.add' });
}
// When this component is mounted, load the first page of contacts
onMounted(() => retrieveContacts(1));
// Whenever searchText changes, reset selectedIndex
watch(searchText, () => (selectedIndex.value = -1));
// When currentPage changes, fetch contacts for currentPage
watchEffect(() => retrieveContacts(currentPage.value));
// The full code will be presented below
</script>
<template>
    <div class="page row mb-5">
    <div class="mt-3 col-md-6">
    <h4>
    Danh bạ
    <i class="fas fa-address-book"></i>
    </h4>
    <div class="my-3">
    <InputSearch v-model="searchText" />
    </div>
    <ContactList
    v-if="filteredContacts.length > 0"
    :contacts="filteredContacts"
    v-model:selectedIndex="selectedIndex"
    />
    <p v-else>
    Không có liên hệ nào.
    </p>
    <div class="mt-3 d-flex justify-content-center align-items-center">
    <Pagination
    :totalPages="totalPages"
    v-model:currentPage="currentPage"
    />
    </div>
    <div class="mt-3 row justify-content-around align-items-center">
    <button
    class="btn btn-sm btn-primary"
    @click="retrieveContacts(currentPage)"
    >
    <i class="fas fa-redo"></i> Làm mới
    </button>
    <button
    class="btn btn-sm btn-success"
    @click="goToAddContact"
    >
    <i class="fas fa-plus"></i> Thêm mới
    </button>

    <button
    class="btn btn-sm btn-danger"
    @click="onDeleteContacts"
    >
    <i class="fas fa-trash"></i> Xóa tất cả
    </button>
    </div>
    </div>
    <div class="mt-3 col-md-6">
    <div v-if="selectedContact">
    <h4>
    Chi tiết Liên hệ
    <i class="fas fa-address-card"></i>
    </h4>
    <ContactCard :contact="selectedContact" />
    </div>
    </div>
    </div>
</template>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>