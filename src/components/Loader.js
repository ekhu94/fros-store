import React from 'react';

const Loader = () => {
    return (
        <div className="ui active dimmer" style={{height: '120vh'}}>
            <div className="ui text loader">Searching thy soul...</div>
        </div>
    );
};

export default Loader;