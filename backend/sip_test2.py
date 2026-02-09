import uuid
import random
import socket

def make_exotel_call(
    exotel_ip: str,
    exotel_port: int,
    customer_ip: str,
    customer_port: int,
    media_ip: str,
    rtp_port: int,
    caller: str,      # Exophone (CLI)
    callee: str       # Destination number
) -> dict:
    """
    Makes an outbound SIP call through Exotel.
    
    Returns dict with 'invite_sent' and 'response_received'.
    """
    
    # ─── SIP Header Helpers ─────────────────────────────────────────────
    def _generate_branch() -> str:
        return f"z9hG4bK-{uuid.uuid4().hex}"
    
    def _generate_call_id() -> str:
        # Exotel sample uses a UUID without the domain
        return str(uuid.uuid4())
    
    def _generate_tag() -> str:
        return f"trunk{random.randint(10000, 99999)}"
    
    # ─── SDP Builder ────────────────────────────────────────────────────
    def _build_sdp(media_ip: str, rtp_port: int) -> str:
        # Updated to match Exotel sample:
        # - Added s=- line
        # - Removed PCMA (8)
        # - fmtp:101 0-15
        # - Removed maxptime
        return f"""v=0
o=- {random.randint(1000000000, 2000000000)} {random.randint(1000000000, 2000000000)} IN IP4 {media_ip}
s=-
c=IN IP4 {media_ip}
t=0 0
m=audio {rtp_port} RTP/AVP 0 101
a=rtpmap:0 PCMU/8000
a=rtpmap:101 telephone-event/8000
a=fmtp:101 0-15
a=ptime:20
a=sendrecv
"""
    
    # ─── INVITE Builder ─────────────────────────────────────────────────
    def _build_invite() -> bytes:
        branch = _generate_branch()
        tag = _generate_tag()
        call_id = _generate_call_id()
        
        sdp = _build_sdp(media_ip, rtp_port)
        content_length = len(sdp.encode())
        
        # Domains based on Exotel email
        from_domain = "lokaviveka1m.sip.exotel.com"
        
        # Note: Exotel's example 'Via' says TLS but 'Contact' says TCP.
        # We are using TCP transport here to match the Contact header and typical trunking.
        
        invite = f"""INVITE sip:{callee}@{exotel_ip}:{exotel_port} SIP/2.0
Via: SIP/2.0/TCP {customer_ip}:{customer_port};branch={branch};rport
Max-Forwards: 70
From: "{caller}" <sip:{caller}@{from_domain}>;tag={tag}
To: <sip:{callee}@{exotel_ip}:{exotel_port}>
Call-ID: {call_id}
CSeq: 1 INVITE
Contact: <sip:+91{caller}@{customer_ip}:{customer_port};transport=tcp>
Supported: 100rel, timer
Allow: INVITE, ACK, CANCEL, BYE, OPTIONS, UPDATE
Content-Type: application/sdp
Content-Length: {content_length}

{sdp}"""
        
        return invite.encode()
    
    # ─── TCP Transport ──────────────────────────────────────────────────
    def _send_tcp(message: bytes) -> str:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(10)
        
        try:
            sock.connect((exotel_ip, exotel_port))
            sock.sendall(message)
            response = sock.recv(4096)
            return response.decode(errors="ignore")
        finally:
            sock.close()
    
    # ─── Execute ────────────────────────────────────────────────────────
    invite_msg = _build_invite()
    response = _send_tcp(invite_msg)
    
    return {
        "invite_sent": invite_msg.decode(),
        "response_received": response
    }


# ─── Example Usage ──────────────────────────────────────────────────────
if __name__ == "__main__":
    result = make_exotel_call(
        exotel_ip="pstn.in1.exotel.com",  # Updated to in1
        exotel_port=5070,
        customer_ip="13.234.150.174",
        customer_port=5061,
        media_ip="13.234.150.174",
        rtp_port=18232,
        caller="08044319240",             # Exophone without +91 (matching From header)
        callee="08697421450"              # Destination
    )
    
    print("===== SIP INVITE =====")
    print(result["invite_sent"])
    
    print("\n===== SIP RESPONSE =====")
    print(result["response_received"])