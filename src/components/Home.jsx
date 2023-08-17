import React from 'react'
import { useSelector } from 'react-redux';

const Home = () => {
  const peer = React.useRef(null);
  const localVideoRef = React.useRef(null);
  let echo = useSelector(state => state.AppReducer.echo)

  React.useEffect(() => {
    if (!echo) {
      return
    }

    echo.channel('call.channel.1').listen('CallingEvent', () => {
      if (signal.initiator) {
        //Se você é o iniciador da chamada, então responda à chamada
        startCall(true, signal);
      }
    });
  }, [echo]);

  const startCall = (initiator, signal = null) => {
    // Criar um novo peer (seu peer local)
    peer.current = new SimplePeer({
      initiator: initiator,
      trickle: false, // Desabilitar a transmissão de ICE candidates (não essencial, mas pode ajudar em alguns casos)
    });

    // Ao receber um sinal do peer remoto (quando o outro usuário responde a sua chamada)
    peer.current.on('signal', data => {
      // Enviar o sinal para o servidor (através do Laravel Echo)
      echo.channel('call.channel.1').listen('CallingEvent', { signal: data });
    });

    // Verificar se o navegador suporta getUserMedia
    if (initiator) {
      // Verificar os dispositivos disponíveis antes de chamar getUserMedia
      const constraints = { audio: true, video: true };
      navigator.mediaDevices.getUserMedia({ video: false, audio: true })
        .then(stream => {
          // Adicionar o stream local ao peer para que você possa se ver durante a chamada
          peer.current.addStream(stream);

          // Renderizar o seu próprio vídeo local (opcional)
          const localVideo = document.getElementById('localVideo');
          if (localVideo) {
            localVideo.srcObject = stream;
          }
        })
        .catch(error => {
          console.error('Erro ao obter stream de áudio/vídeo:', error);
        });
    } else {
      // O navegador não suporta getUserMedia
      console.error('getUserMedia não é suportado neste navegador.');
    }

    // Iniciar a chamada localmente
    startCall(true);

    // Configurar o sinal recebido no peer local para estabelecer a conexão
    if (signal) {
      peer.current.signal(signal);
    }
  };

  const callUser = () => {
    // Emitir o evento "calling" para o Laravel Echo, indicando que você está iniciando uma chamada
    echo.channel('call.channel.1').listen('.CallingEvent', { signal: { initiator: true } });

    // Iniciar a chamada localmente
    startCall(true);
  };

  return (
    <div>
      {/* Elemento de vídeo para exibir o seu próprio vídeo local */}
      <video ref={localVideoRef} autoPlay muted playsInline style={{ width: '320px', height: '240px' }} />

      {/* Botão para iniciar a chamada */}
      <button onClick={callUser}>Iniciar Chamada</button>

      {/* Elemento de vídeo para exibir o vídeo remoto (será configurado em outro lugar) */}
      {/* <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '320px', height: '240px' }} /> */}
    </div>
  )
}

export default Home