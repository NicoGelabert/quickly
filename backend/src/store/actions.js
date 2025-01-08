import axiosClient from "../axios";

export function getCurrentUser({commit}, data) {
  return axiosClient.get('/user', data)
    .then(({data}) => {
      commit('setUser', data);
      return data;
    })
}

export function login({commit}, data) {
  return axiosClient.post('/login', data)
    .then(({data}) => {
      commit('setUser', data.user);
      commit('setToken', data.token)
      return data;
    })
}

export function logout({commit}) {
  return axiosClient.post('/logout')
    .then((response) => {
      commit('setToken', null)

      return response;
    })
}

export function getCountries({commit}) {
  return axiosClient.get('countries')
    .then(({data}) => {
      commit('setCountries', data)
    })
}

export function getOrders({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setOrders', [true])
  url = url || '/orders'
  const params = {
    per_page: state.orders.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setOrders', [false, response.data])
    })
    .catch(() => {
      commit('setOrders', [false])
    })
}

export function getOrder({commit}, id) {
  return axiosClient.get(`/orders/${id}`)
}

// HOMEHEROBANNERS
export function getHomeHeroBanners({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setHomeHeroBanners', [true])
  url = url || '/homeherobanners'
  const params = {
    per_page: state.homeHeroBanners.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setHomeHeroBanners', [false, response.data])
    })
    .catch(() => {
      commit('setHomeHeroBanners', [false])
    })
}

export function getHomeHeroBanner({commit}, id) {
  return axiosClient.get(`/homeherobanners/${id}`)
}

export function createHomeHeroBanner({commit}, homeHeroBanner) {
  if (homeHeroBanner.image instanceof File) {
    const form = new FormData();
    form.append('image', homeHeroBanner.image);
    form.append('headline', homeHeroBanner.headline);
    form.append('description', homeHeroBanner.description);
    form.append('link', homeHeroBanner.link);
    form.append('title', homeHeroBanner.title);
    form.append('service', homeHeroBanner.service);
    homeHeroBanner = form;
  }
  return axiosClient.post('/homeherobanners', homeHeroBanner)
}

export function updateHomeHeroBanner({commit}, homeHeroBanner) {
  const id = homeHeroBanner.id
  if (homeHeroBanner.image instanceof File) {
    const form = new FormData();
    form.append('id', homeHeroBanner.id);
    form.append('image', homeHeroBanner.image);
    form.append('headline', homeHeroBanner.headline);
    form.append('description', homeHeroBanner.description);
    form.append('link', homeHeroBanner.link);
    form.append('title', homeHeroBanner.title);
    form.append('service', homeHeroBanner.service);
    form.append('_method', 'PUT');
    homeHeroBanner = form;
  } else {
    homeHeroBanner._method = 'PUT'
  }
  return axiosClient.post(`/homeherobanners/${id}`, homeHeroBanner)
}

export function deleteHomeHeroBanner({commit}, id) {
  return axiosClient.delete(`/homeherobanners/${id}`)
}

// CATEGORIES
export function getCategories({commit, state}, {sort_field, sort_direction} = {}) {
  commit('setCategories', [true])
  return axiosClient.get('/categories', {
    params: {
      sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setCategories', [false, response.data])
    })
    .catch(() => {
      commit('setCategories', [false])
    })
}

export function createCategory({commit}, category) {
  if (category.image instanceof File) {
    const form = new FormData();
    form.append('name', category.name);
    form.append('image', category.image);
    form.append('active', category.active ? 1 : 0);
    category = form;
  }
  return axiosClient.post('/categories', category)
}

export function updateCategory({commit}, category) {
  const id = category.id
  if (category.image instanceof File) {
    const form = new FormData();
    form.append('name', category.name);
    form.append('image', category.image);
    form.append('active', category.active ? 1 : 0);
    form.append('_method', 'PUT');
    category = form;
  } else {
    category._method = 'PUT'
  }
  return axiosClient.post(`/categories/${id}`, category)
}

export function deleteCategory({commit}, id) {
  return axiosClient.delete(`/categories/${id}`)
}

// PRODUCTS
export function getProducts({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setProducts', [true])
  url = url || '/products'
  const params = {
    per_page: state.products.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setProducts', [false, response.data])
    })
    .catch(() => {
      commit('setProducts', [false])
    })
}

export function getProduct({commit}, id) {
  return axiosClient.get(`/products/${id}`)
}

export function createProduct({ commit }, product) {
  const form = new FormData();

  form.append('title', product.title);
  form.append('description', product.description || '');
  form.append('published', product.published ? 1 : 0);

  // Agregar precios al FormData
  if (product.prices && product.prices.length) {
    product.prices.forEach((price, index) => {
      form.append(`prices[${index}][number]`, price.number);
      form.append(`prices[${index}][size]`, price.size);
    });
  }

  // Agregar imágenes al FormData
  if (product.images && product.images.length) {
    product.images.forEach((im) => {
      form.append(`images[]`, im);
    });
  }

  // Agregar categorías al FormData
  if (product.categories && product.categories.length) {
    product.categories.forEach((category) => {
      form.append(`categories[]`, category);
    });
  }

  // Agregar alérgenos al FormData
  if (product.alergens && product.alergens.length) {
    product.alergens.forEach((alergen) => {
      form.append(`alergens[]`, alergen);
    });
  }

  // Agregar cantidad al FormData
  if (product.quantity) {
    form.append('quantity', product.quantity);
  }

  return axiosClient.post('/products', form);
}


export function updateProduct({commit}, product) {
  const id = product.id
  if (product.images && product.images.length) {
    const form = new FormData();
    form.append('id', product.id);
    form.append('title', product.title);
    form.append('description', product.description || '');
    form.append('published', product.published ? 1 : 0);
    
  // Agregar categorías al FormData
  if (product.categories && product.categories.length) {
    product.categories.forEach((category) => {
      form.append(`categories[]`, category);
    });
  }

  // Agregar alérgenos al FormData
  if (product.alergens && product.alergens.length) {
    product.alergens.forEach((alergen) => {
      form.append(`alergens[]`, alergen);
    });
  }
  
    if (product.prices && product.prices.length) {
      product.prices.forEach((price, index) => {
        form.append(`prices[${index}][number]`, price.number);
        form.append(`prices[${index}][size]`, price.size);
      });
    }
    // Agregar imágenes al FormData
    if (product.images && product.images.length) {
      product.images.forEach((im) => {
        form.append(`images[]`, im);
      });
    }
    // Agregar imágenes eliminadas al FormData
    if (product.deleted_images && product.deleted_images.length) {
      product.deleted_images.forEach((id) => form.append('deleted_images[]', id));
    }
    // Agregar posiciones de imágenes al FormData
    for (let id in product.image_positions) {
      form.append(`image_positions[${id}]`, product.image_positions[id]);
    }
    form.append('_method', 'PUT');
    product = form;
  } else {
    product._method = 'PUT'
  }
  return axiosClient.post(`/products/${id}`, product)
}

export function deleteProduct({commit}, id) {
  return axiosClient.delete(`/products/${id}`)
}

// USERS
export function getUsers({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setUsers', [true])
  url = url || '/users'
  const params = {
    per_page: state.users.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setUsers', [false, response.data])
    })
    .catch(() => {
      commit('setUsers', [false])
    })
}

export function createUser({commit}, user) {
  return axiosClient.post('/users', user)
}

export function updateUser({commit}, user) {
  return axiosClient.put(`/users/${user.id}`, user)
}

export function getCustomers({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setCustomers', [true])
  url = url || '/customers'
  const params = {
    per_page: state.customers.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setCustomers', [false, response.data])
    })
    .catch(() => {
      commit('setCustomers', [false])
    })
}

export function getCustomer({commit}, id) {
  return axiosClient.get(`/customers/${id}`)
}

export function createCustomer({commit}, customer) {
  return axiosClient.post('/customers', customer)
}

export function updateCustomer({commit}, customer) {
  return axiosClient.put(`/customers/${customer.id}`, customer)
}

export function deleteCustomer({commit}, customer) {
  return axiosClient.delete(`/customers/${customer.id}`)
}

//ALERGENS
export function getAlergens({commit, state}, {sort_field, sort_direction} = {}) {
  commit('setAlergens', [true])
  return axiosClient.get('/alergens', {
    params: {
      sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setAlergens', [false, response.data])
    })
    .catch(() => {
      commit('setAlergens', [false])
    })
}

export function createAlergen({commit}, alergen) {
  if (alergen.image instanceof File) {
    const form = new FormData();
    form.append('name', alergen.name);
    form.append('image', alergen.image);
    form.append('active', alergen.active ? 1 : 0);
    alergen = form;
  }
  return axiosClient.post('/alergens', alergen)
}

export function updateAlergen({commit}, alergen) {
  const id = alergen.id
  if (alergen.image instanceof File) {
    const form = new FormData();
    form.append('name', alergen.name);
    form.append('image', alergen.image);
    form.append('active', alergen.active ? 1 : 0);
    form.append('_method', 'PUT');
    alergen = form;
  } else {
    alergen._method = 'PUT'
  }
  return axiosClient.post(`/alergens/${id}`, alergen)
}

export function deleteAlergen({commit}, alergen) {
  return axiosClient.delete(`/alergens/${alergen.id}`)
}

// SERVICES
export function getServices({commit, state}, {sort_field, sort_direction} = {}) {
  commit('setServices', [true])
  return axiosClient.get('/services', {
    params: {
      sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setServices', [false, response.data])
    })
    .catch(() => {
      commit('setServices', [false])
    })
}

export function createService({commit}, service) {
  if (service.image instanceof File) {
    const form = new FormData();
    form.append('name', service.name);
    form.append('icon', service.icon);
    form.append('active', service.active ? 1 : 0);
    form.append('short_description', service.short_description);
    form.append('description', service.description);
    // Agregar atributos al FormData
    if (service.attributes && service.attributes.length) {
      service.attributes.forEach((attribute, index) => {
        form.append(`attributes[${index}][text]`, attribute.text);
      });
    }
    form.append('image', service.image);
    service = form;
  }
  return axiosClient.post('/services', service)
}

export function updateService({commit}, service) {
  const id = service.id
  if (service.image instanceof File) {
    const form = new FormData();
    form.append('name', service.name);
    form.append('icon', service.icon);
    form.append('active', service.active ? 1 : 0);
    form.append('short_description', service.short_description);
    form.append('description', service.description);
    // Agregar atributos al FormData
    if (service.attributes && service.attributes.length) {
      service.attributes.forEach((attribute, index) => {
        form.append(`attributes[${index}][text]`, attribute.text);
      });
    }
    form.append('image', service.image);
    form.append('_method', 'PUT');
    service = form;
  } else {
    service._method = 'PUT'
  }
  return axiosClient.post(`/services/${id}`, service)
}

export function deleteService({commit}, service) {
  return axiosClient.delete(`/services/${service.id}`)
}

// PROJECTS
export function getProjects({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction} = {}) {
  commit('setProjects', [true])
  url = url || '/projects'
  const params = {
    per_page: state.projects.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setProjects', [false, response.data])
    })
    .catch(() => {
      commit('setProjects', [false])
    })
}

export function getProject({commit}, id) {
  return axiosClient.get(`/projects/${id}`)
}

export function createProject({ commit }, project) {
  const form = new FormData();

  form.append('title', project.title);
  form.append('description', project.description || '');
  form.append('published', project.published ? 1 : 0);

  // Agregar imágenes al FormData
  if (project.images && project.images.length) {
    project.images.forEach((im) => {
      form.append(`images[]`, im);
    });
  }

  // Agregar services al FormData
  if (project.services && project.services.length) {
    project.services.forEach((service) => {
      form.append(`services[]`, service);
    });
  }

  // Agregar tags al FormData
  if (project.tags && project.tags.length) {
    project.tags.forEach((tag) => {
      form.append(`tags[]`, tag);
    });
  }

  // Agregar clients al FormData
  if (project.clients && project.clients.length) {
    project.clients.forEach((client) => {
      form.append(`clients[]`, client);
    });
  }

  return axiosClient.post('/projects', form);
}


export function updateProject({commit}, project) {
  const id = project.id
  if (project.images && project.images.length) {
    const form = new FormData();
    form.append('id', project.id);
    form.append('title', project.title);
    form.append('description', project.description || '');
    form.append('published', project.published ? 1 : 0);
    
    // Agregar services al FormData
    if (project.services && project.services.length) {
      project.services.forEach((service) => {
        form.append(`services[]`, service);
      });
    }

    // Agregar tags al FormData
    if (project.tags && project.tags.length) {
      project.tags.forEach((tag) => {
        form.append(`tags[]`, tag);
      });
    }

    // Agregar clients al FormData
    if (project.clients && project.clients.length) {
      project.clients.forEach((client) => {
        form.append(`clients[]`, client);
      });
    }

    // Agregar imágenes al FormData
    if (project.images && project.images.length) {
      project.images.forEach((im) => {
        form.append(`images[]`, im);
      });
    }

    // Agregar imágenes eliminadas al FormData
    if (project.deleted_images && project.deleted_images.length) {
      project.deleted_images.forEach((id) => form.append('deleted_images[]', id));
    }
    
    // Agregar posiciones de imágenes al FormData
    for (let id in project.image_positions) {
      form.append(`image_positions[${id}]`, project.image_positions[id]);
    }
    form.append('_method', 'PUT');
    project = form;
  } else {
    project._method = 'PUT'
  }
  return axiosClient.post(`/projects/${id}`, project)
}

export function deleteProject({commit}, id) {
  return axiosClient.delete(`/projects/${id}`)
}

//TAGS
export function getTags({commit, state}, {sort_field, sort_direction} = {}) {
  commit('setTags', [true])
  return axiosClient.get('/tags', {
    params: {
      sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setTags', [false, response.data])
    })
    .catch(() => {
      commit('setTags', [false])
    })
}

export function createTag({commit}, tag) {
  if (tag.image instanceof File) {
    const form = new FormData();
    form.append('name', tag.name);
    form.append('image', tag.image);
    form.append('active', tag.active ? 1 : 0);
    tag = form;
  }
  return axiosClient.post('/tags', tag)
}

export function updateTag({commit}, tag) {
  const id = tag.id
  if (tag.image instanceof File) {
    const form = new FormData();
    form.append('name', tag.name);
    form.append('image', tag.image);
    form.append('active', tag.active ? 1 : 0);
    form.append('_method', 'PUT');
    tag = form;
  } else {
    tag._method = 'PUT'
  }
  return axiosClient.post(`/tags/${id}`, tag)
}

export function deleteTag({commit}, tag) {
  return axiosClient.delete(`/tags/${tag.id}`)
}

//CLIENTS
export function getClients({commit, state}, {sort_field, sort_direction} = {}) {
  commit('setClients', [true])
  return axiosClient.get('/clients', {
    params: {
      sort_field, sort_direction
    }
  })
    .then((response) => {
      commit('setClients', [false, response.data])
    })
    .catch(() => {
      commit('setClients', [false])
    })
}

export function createClient({commit}, client) {
  if (client.image instanceof File) {
    const form = new FormData();
    form.append('name', client.name);
    form.append('image', client.image);
    form.append('active', client.active ? 1 : 0);
    client = form;
  }
  return axiosClient.post('/clients', client)
}

export function updateClient({commit}, client) {
  const id = client.id
  if (client.image instanceof File) {
    const form = new FormData();
    form.append('name', client.name);
    form.append('image', client.image);
    form.append('active', client.active ? 1 : 0);
    form.append('_method', 'PUT');
    client = form;
  } else {
    client._method = 'PUT'
  }
  return axiosClient.post(`/clients/${id}`, client)
}

export function deleteClient({commit}, client) {
  return axiosClient.delete(`/clients/${client.id}`)
}