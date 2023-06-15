import React, { useState } from 'react';
import CurrentAccount from '../../elements/Accounts/CurrentAccount';
import { Account } from '../../types/Account';
import { current } from '@reduxjs/toolkit';

const AccountPicker = () => {
    const currentAccount: Account = {
        id: "sdfsdf",
        name: "Demo Account",
        balance: 380,
        currency: "₴"
    }

    return (
    <div>
        <CurrentAccount account={currentAccount} />
        {/* ToDo: modal? menu with accounts list */}
    </div>
    );
};

export default AccountPicker;