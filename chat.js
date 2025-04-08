$(document).ready(function() {
    // Toggle action menu
    $('#action_menu_btn').click(function() {
        $('.action_menu').toggle();
    });

    // Initial messages
    const messages = [
        {
            sender: "FitTrainer",
            text: "Hello! How are you today?",
            time: getCurrentTime(),
            isMe: false,
            img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        }
    ];

    // Load messages
    function loadMessages() {
        const messageContainer = $('#message-container');
        messageContainer.empty();
        
        messages.forEach(msg => {
            if (msg.isMe) {
                messageContainer.append(`
                    <div class="d-flex justify-content-end mb-2">
                        <div class="msg_cotainer_send">
                            ${msg.text}
                            <span class="msg_time_send">${msg.time}</span>
                        </div>
                        <div class="img_cont_msg">
                            <img src="${msg.img}" class="rounded-circle user_img_msg">
                        </div>
                    </div>
                `);
            } else {
                messageContainer.append(`
                    <div class="d-flex justify-content-start mb-2">
                        <div class="img_cont_msg">
                            <img src="${msg.img}" class="rounded-circle user_img_msg">
                        </div>
                        <div class="msg_cotainer">
                            ${msg.text}
                            <span class="msg_time">${msg.time}</span>
                        </div>
                    </div>
                `);
            }
        });
        
        // Scroll to bottom
        messageContainer.scrollTop(messageContainer[0].scrollHeight);
    }

    // Get current time in HH:MM AM/PM format
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        return `${hours}:${minutes} ${ampm}`;
    }

    // Send message
    $('#send-button').click(sendMessage);
    $('#message-input').keypress(function(e) {
        if (e.which === 13 && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const input = $('#message-input');
        const messageText = input.val().trim();
        
        if (messageText) {
            messages.push({
                sender: "Me",
                text: messageText,
                time: getCurrentTime(),
                isMe: true,
                img: "https://avatars.hsoubcdn.com/ed57f9e6329993084a436b89498b6088?s=256"
            });
            
            input.val('');
            loadMessages();
        }
    }

    // Contact click handler
    $('.contacts li').click(function() {
        $('.contacts li').removeClass('activeC');
        $(this).addClass('activeC');
        
        // Update chat header with selected contact
        const contactName = $(this).find('.user_info span').text();
        const contactStatus = $(this).find('.user_info p').text();
        const contactImg = $(this).find('.user_img').attr('src');
        
        $('.msg_head .user_info span').text(contactName);
        $('.msg_head .user_info p').text(contactStatus);
        $('.msg_head .img_cont img').attr('src', contactImg);
    });

    // Initial load
    loadMessages();
});