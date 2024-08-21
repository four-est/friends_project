import React from 'react'

function LandingPage() {
    return (
        <div style={{ height: '100vh', backgroundColor: '#0E4A84' }}>
            <div style={{ width: '90%', margin: '0px auto' }}>
                <div style={{ padding: '200px 0px 55px 0px' }}>
                    <p style={{ color: '#fff', fontSize: 'bold', fontSize: '32px', textAlign: 'center', margin: 0 }}>FRIEND'S</p>
                </div>
                <a href='/translation' style={{textDecoration: 'none'}}>
                    <div style={{ width: '100%', height: '50px', borderRadius: '20px', border: 'none', backgroundColor: '#fff' }}>
                        <p style={{ fontSize: '15px', textAlign: 'center', color: '#0E4A84', paddingTop: '13px', margin: 0 }}>번역기</p>
                    </div>
                </a>
                <a href='/recommend' style={{textDecoration: 'none'}}>
                    <div style={{ width: '100%', height: '50px', borderRadius: '20px', border: 'none', backgroundColor: '#fff', marginTop: '40px' }}>
                        <p style={{ fontSize: '15px', textAlign: 'center', color: '#0E4A84', paddingTop: '13px', margin: 0 }}>AI 추천</p>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default LandingPage