import React, { useState, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Context } from './store/appContext';

import { Single } from "./views/single"
import { Home } from "./views/home";
import injectContext from "./store/appContext";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	const { store, actions } = useContext(Context);

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="*" element={<h1>Not found!</h1>} />

						{store.agendas.map((agenda, index) => (
							agenda.contacts[0] ? agenda.contacts.map((contact, contactIndex) => (
								<Route path={"/" + agenda.slug + '/' + contact.name} element={<Single contact={contact}/>} />
							)) : <></>
						))}
					</Routes>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);