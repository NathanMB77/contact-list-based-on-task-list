const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			agendas: []
		},
		actions: {
			fetchAgendas: () => {
				fetch("https://playground.4geeks.com/contact/agendas")
					.then(response => response.json())
					.then(json => {
						let agendasLength = json.agendas.length;
						for (let i = 0; i < agendasLength; i++) {
							let agenda = json.agendas[i];
							let contact = {};
							let contacts = [];
							fetch("https://playground.4geeks.com/contact/agendas/" + agenda.slug)
								.then(resp => resp.json())
								.then(json => {
									for (let j = 0; j < json.contacts.length; j++) {
										contact = {
											name: json.contacts[j].name,
											phone: json.contacts[j].phone,
											email: json.contacts[j].email,
											address: json.contacts[j].address,
											id: json.contacts[j].id
										}
										contacts.push(contact);
									}
								})
								.then(() => {
									getActions().addAgenda(agenda.slug, contacts);
								})
								.catch((error) => {
									console.error("error1 fetching data: ", error);
								});
						}
					})
					.catch((error) => {
						console.error("error fetching data: ", error);
					});
			},
			
			deleteAgenda: (slug) => {
				fetch('https://playground.4geeks.com/contact/agendas/' + slug, {
					method: 'DELETE',
				})
					.then(response => {
						if (response.ok) {
							console.log('agenda "' + slug + '" deleted');
							const agendas = getStore().agendas;
							console.log(agendas);
							for (let i = 0; i < agendas.length; i++) {
								if (agendas[i].slug == slug) {
									agendas.splice(i, 1);
								}
							}
							setStore({ agendas: agendas });
						}
						else {
							throw new Error('failed to delete contact "' + slug + '"');
						}
					})
					.catch(error => {
						console.log(error);
					})
			},
			addAgenda: async (slug, contacts) => {
				const newAgenda = {
					slug: slug,
					contacts: contacts
				};
				const store = getStore();
				const updatedAgendas = [...store.agendas, newAgenda];
				setStore({ agendas: updatedAgendas });
			},

			deleteContact: (agendaSlug, contactId) => {
				const store = getStore();
				const agenda = store.agendas.find(a => a.slug === agendaSlug);
				if (!agenda) {
					console.error(`Agenda with slug ${agendaSlug} not found.`);
					return;
				}
				const updatedContacts = agenda.contacts.filter(c => c.id !== contactId);
				const updatedAgendas = store.agendas.map(a => {
					if (a.slug === agendaSlug) {
						return { ...a, contacts: updatedContacts };
					}
					return a;
				});
				setStore({ agendas: updatedAgendas });
			},

			createContact: (contactInfo, slug) => {
				console.log('Creating contact with info:', contactInfo);
				const store = getStore();
				console.log('store:')
				console.log(store);
				const storeAgenda = store.agendas.find(agenda => agenda.slug === slug);
				if (!storeAgenda) {
					console.error(`Agenda with slug ${slug} not found.`);
					return;
				}
				console.log('agenda:');
				console.log(storeAgenda);
				const contacts = storeAgenda.contacts;
				console.log('contacts:');
				console.log(contacts);
				contacts.push({
					name: contactInfo.name,
					phone: contactInfo.phone,
					email: contactInfo.email,
					address: contactInfo.address,
					id: -1
				})
				fetch('https://playground.4geeks.com/contact/agendas/' + slug + '/contacts', {
					method: 'POST',
					headers: {
						'accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						name: contactInfo.name,
						phone: contactInfo.phone,
						email: contactInfo.email,
						address: contactInfo.address
					})
				})
					.then(response => {
						if (response.ok) {
							console.log('New contact created successfully');
							fetch('https://playground.4geeks.com/contact/agendas/' + slug + '/contacts')
							.then(response => response.json())
							.then(json => {
								console.log(json.contacts);
								const updatedAgendas = store.agendas.map(a => {
									if (a.slug === slug){
										return { ...a, contacts: json.contacts};
									}
									return a;
								})
								setStore({ agendas: updatedAgendas });
							})

						}
						else {
							throw new Error('Failed to add new contact');
						}
					})
					.catch(error => {
						console.error(error);
					})


			}
		}
	};
};

export default getState;