<template>
	<form>
		<div class="form-group">
			<label for="name">Tên</label>
			<input
				name="name"
				type="text"
				class="form-control"
			/>
		</div>
		<div class="form-group">
			<label for="email">E-mail</label>
			<input
				name="email"
				type="email"
				class="form-control"
			/>
		</div>
		<div class="form-group">
			<label for="address">Địa chỉ</label>
			<input
				name="address"
				type="text"
				class="form-control"
			/>
		</div>
		<div class="form-group">
			<label for="phone">Điện thoại</label>
			<input
				name="phone"
				type="tel"
				class="form-control"
			/>
		</div>

		<div class="form-group form-check">
			<input
				name="favorite"
				type="checkbox"
				class="form-check-input"
			/>
			<label
				for="favorite"
				class="form-check-label"
			>
				<strong>Liên hệ yêu thích</strong>
			</label>
		</div>

		<div class="form-group">
			<button class="btn btn-primary"><i class="fas fa-save"></i> Lưu</button>
			<button
				type="button"
				class="ml-2 btn btn-danger"
			>
				<i class="fas fa-trash"></i> Xóa
			</button>
		</div>
	</form>
</template>

<style scoped>
@import '@/assets/form.css';
</style>
