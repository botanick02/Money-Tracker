import React from 'react';
import ExampleComponent from "../../components/ExampleComponent/ExampleComponent";
import SignInForm from './SignIn/SignInForm';

const ExamplePage = () => {
    return (
        <div>
           <SignInForm/>
            <ExampleComponent/>
        </div>
    );
};

export default ExamplePage;