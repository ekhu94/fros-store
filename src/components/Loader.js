import React from 'react';

const Loader = () => {
    return (
        <div className="ui active dimmer" style={{height: '120vh'}}>
            <div className="ui text loader">Freeing Thy Soul...</div>
        </div>
    );
};

export default Loader;