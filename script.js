<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trade Offer Creator - Bee Swarm Simulator Trading</title>
    <meta name="description" content="BSSTrades is a tool that allows you to make a wishlist with an advanced index that allows you to search stickers with keywords, the main goal is to help you with Bee Swarm Simulator trading.">
    <link rel="icon" type="image/png" href="index/favicon.png">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/UAParser.js/0.7.31/ua-parser.min.js"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="patch-note-popup" class="popup">
        <div class="popup-content">
            <span class="close">&times;</span>
            <h2>Patch Notes</h2>
            <p>⚠️UPDATES⚠️</p>
            <ul>
                <li>General Bug Fixes (Double Click to exit Indexs).</li>
            </ul>
        </div>
    </div>
    <div id="mySidebar" class="sidebar">
        <a href="/">
            <img src="csscontentTV/homeicon_side.png" alt="Home" class="icon">
        </a>
        <a href="/informations">
            <img src="csscontentTV/questionicon_side.png" alt="FAQ" class="icon">
        </a>
    </div>
    <div id="main">
        <button class="togglebtn" onclick="toggleNav()">☰ Open</button>
    </div>
    <!--<div class="devtext">If anyone is interested "Bee Swarm Guide" is giving out some youtube stickers on his livestream, take your chance <a href="https://www.youtube.com/watch?v=gwzVMlbuksA">Here</a>.</div>-->
    <div class="container">
        <div class="header">
            <h1><img src="csscontentTV/textdeco_icon.webp" alt="Text Deco Icon">Trade Offer Creator<img src="csscontentTV/textdeco_icon.webp" alt="Text Deco Icon"></h1>
        </div>
        <div class="main">
            <div class="section" id="to-offer">
                <h2 class="offering">Offering</h2>
                <div class="items" id="to-offer-items"></div>
                <button onclick="openModal('to-offer')">Add Item</button><button class="clear-button clear-offer-button" onclick="clearSection('to-offer-items')">Clear All</button>
            </div>
            <div>
                <img src="csscontentTV/tarrowsbeesmasnew.png" alt="Trade Arrows">
            </div>
            <div class="section" id="looking-for">
                <h2 class="receiving">Looking For</h2>
                <div class="items" id="looking-for-items"></div>
                <button onclick="openModal('looking-for')">Add Item</button><button class="clear-button clear-looking-button" onclick="clearSection('looking-for-items')">Clear All</button>
            </div>
        </div>
        <div class="slot-menu">
            <div id="slots-container"></div>
        </div>
        <h2 class="h2ss">Screenshot your trade to share it!</h2>
        <div class="share-container" id="copyButton">Share website!</div>
    </div>
    <div class="mediabutton-container">
        <a href="https://discord.gg/X2r7V6uAfu" class="mediabutton button-anim">
            <img src="csscontentTV/Discord.png" alt="Discord">
            Discord
        </a>
        <a href="https://www.youtube.com/@AlmostToad/videos" class="mediabutton button-anim">
            <img src="csscontentTV/Youtube.png" alt="Youtube">
            Youtube
        </a>
        <a href="https://www.roblox.com/users/429937011/profile" class="mediabutton button-anim">
            <img src="csscontentTV/Roblox.png" alt="Roblox">
            Roblox Profile
        </a>
    </div>
    <h2 class="h2ss">SUPPORT THE YOUTUBE CHANNEL!</h2>
    <div class="video-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/hlk3IAYhuvc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <!-- Primary Modal -->
    <div id="imageModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2>Sticker Index</h2>
            <div class="categories">
                <div class="category">
                    <h3><img src="csscontentTV/stickerscat_icon.png" alt="Stickers Icon">Hive Stickers<img src="csscontentTV/stickerscat_icon.png" alt="Stickers Icon"></h3>
                    <input type="text" placeholder="Search for keywords in Names, Stack Boosts, Stack Rewards, Types(Tools, Stamps, Signs,...)" onkeyup="filterImages(this, 'category4')">
                    <div class="images" id="category4">
                        <img src="index/hive_stickers/Hivesticker_flying_rad_bee.webp" alt="Flying Rad Bee" data-tags="(Red Pollen), (Red Extract)" onclick="selectImage('index/hive_stickers/Hivesticker_flying_rad_bee.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_flying_ninja_bee.webp" alt="Flying Ninja Bee" data-tags="(Bee Movespeed), (Blue Extract)" onclick="selectImage('index/hive_stickers/Hivesticker_flying_ninja_bee.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_flying_brave_bee.webp" alt="Flying Brave Bee" data-tags="(Rare Bee Attack), (Stingers)" onclick="selectImage('index/hive_stickers/Hivesticker_flying_brave_bee.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_flying_photon_bee.webp" alt="Flying Photon Bee" data-tags="(Instant Event Bee Conversion), (Oil)" onclick="selectImage('index/hive_stickers/Hivesticker_flying_photon_bee.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_drooping_stubborn_bee.webp" alt="Drooping Stubborn Bee" data-tags="(Ability Token Lifespan), (Oil)" onclick="selectImage('index/hive_stickers/Hivesticker_drooping_stubborn_bee.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_wobbly_looker_bee.webp" alt="Wobbly Looker Bee" data-tags="(Critical Power), (Neonberry, Neonberries)" onclick="selectImage('index/hive_stickers/Hivesticker_wobbly_looker_bee.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_blob_bumble_bee.webp" alt="Blob Bumble Bee" data-tags="(Blue Bomb Pollen), (Blue Extracts)" onclick="selectImage('index/hive_stickers/Hivesticker_blob_bumble_bee.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_round_rascal_bee.webp" alt="Round Rascal Bee" data-tags="(Red Bomb Pollen), (Red Extracts)" onclick="selectImage('index/hive_stickers/Hivesticker_round_rascal_bee.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_round_basic_bee.webp" alt="Round Basic Bee" data-tags="(Common Bee Pollen), (Basic Eggs)" onclick="selectImage('index/hive_stickers/Hivesticker_round_basic_bee.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_diamond_diamond_bee.webp" alt="Diamond Diamond Bee" data-tags="(Mutated Bee Convert Rate), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_diamond_diamond_bee.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_4-pronged_vector_bee.webp" alt="4-Pronged Vector Bee" data-tags="(Mark Ability Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_4-pronged_vector_bee.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_shocked_hive_slot.webp" alt="Shocked Hive Slot" data-tags="(White Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_shocked_hive_slot.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_bear_bee_offer.webp" alt="Bear Bee Offer" data-tags="(Event Bee Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_bear_bee_offer.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_tabby_scratch.webp" alt="Tabby Scratch" data-tags="(Bee),  (Scratch Pollen), (Pineapples)" onclick="selectImage('index/hive_stickers/Hivesticker_tabby_scratch.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_tabby_from_behind.webp" alt="Tabby From Behind" data-tags="(Bee), (Critical Power), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_tabby_from_behind.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_fuzz_bomb.webp" alt="Fuzz Bomb" data-tags="(Buzz Bomb Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_fuzz_bomb.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_precise_eye.webp" alt="Precise Eye" data-tags="(Super Critical Power), (Hard Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_precise_eye.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_chef_hat_polar_bear.webp" alt="Chef Hat Polar Bear" data-tags="(Instant Colorless Bee Conversion), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_chef_hat_polar_bear.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_honey_bee_bear.webp" alt="Honey Bee Bear" data-tags="(Honey From Tokens), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_honey_bee_bear.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_bomber_bee_bear.webp" alt="Bomber Bee Bear" data-tags="(Buzz Bomb Pollen), (Loaded Dices)" onclick="selectImage('index/hive_stickers/Hivesticker_bomber_bee_bear.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_uplooking_bear.webp" alt="Uplooking Bear" data-tags="(Critical Power), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_uplooking_bear.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_sitting_green_shirt_bear.webp" alt="Sitting Green Shirt Bear" data-tags="(Capacity), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_sitting_green_shirt_bear.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_shy_brown_bear.webp" alt="Shy Brown Bear" data-tags="(Bee Ability Pollen), (Royal Jelly, Royal Jellies)" onclick="selectImage('index/hive_stickers/Hivesticker_shy_brown_bear.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_sitting_mother_bear.webp" alt="Sitting Mother Bear" data-tags="(White Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_sitting_mother_bear.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_squashed_head_bear.webp" alt="Squashed Head Bear" data-tags="(Super Critical Power), (Bitterberry, Bitterberries)" onclick="selectImage('index/hive_stickers/Hivesticker_squashed_head_bear.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_stretched_head_bear.webp" alt="Stretched Head Bear" data-tags="(White Pollen), (Bitterberry, Bitterberries)" onclick="selectImage('index/hive_stickers/Hivesticker_stretched_head_bear.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_panicked_science_bear.webp" alt="Panicked Science Bear" data-tags="(Mutated Bee Convert Rate), (Enzymes)" onclick="selectImage('index/hive_stickers/Hivesticker_panicked_science_bear.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_dapper_from_above.webp" alt="Dapper From Above" data-tags="(Bear), (Pollen), (Ticket Planter)" onclick="selectImage('index/hive_stickers/Hivesticker_dapper_from_above.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_sideways_spirit_bear.webp" alt="Sideways Spirit Bear" data-tags="(Instant Tool Conversion), (Glitters)" onclick="selectImage('index/hive_stickers/Hivesticker_sideways_spirit_bear.webp', alt)">
                        <img src="index/hive_stickers/glowering_gummy_bear.webp" alt="Glowering Gummy Bear" data-tags="(Honey Per Goo), (Glue)" onclick="selectImage('index/hive_stickers/glowering_gummy_bear.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_menacing_mantis.webp" alt="Menacing Mantis" data-tags="(Mobs), (Pineapple Patch Pollen), (Blue Extracts)" onclick="selectImage('index/hive_stickers/Hivesticker_menacing_mantis.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_little_scorpion.webp" alt="Little Scorpion" data-tags="(Mobs), (Rose Patch Pollen), (Red Extracts)" onclick="selectImage('index/hive_stickers/Hivesticker_little_scorpion.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_left_facing_ant.webp" alt="Left Facing Ant" data-tags="(Mobs),  (Legendary Bee Attack), (Ant Pass)" onclick="selectImage('index/hive_stickers/Hivesticker_left_facing_ant.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_walking_stick_nymph.webp" alt="Walking Stick Nymph" data-tags="(Mobs), (Bee Attack), (Stingers)" onclick="selectImage('index/hive_stickers/Hivesticker_walking_stick_nymph.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_forward_facing_spider.webp" alt="Forward Facing Spider" data-tags="(Mobs), (Spider Field Capacity), (Enzymes)" onclick="selectImage('index/hive_stickers/Hivesticker_forward_facing_spider.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_forward_facing_aphid.webp" alt="Forwar Facing Aphid" data-tags="(Mobs), (Bee Attack), (Magic Beans)" onclick="selectImage('index/hive_stickers/Hivesticker_forward_facing_aphid.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_right_facing_stump_snail.webp" alt="Right Facing Stump Snail" data-tags="(Mobs), (Stump Patch Pollen), (Glue)" onclick="selectImage('index/hive_stickers/Hivesticker_right_facing_stump_snail.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_standing_bean_bug.webp" alt="Standing Bean Bug" data-tags="(Mobs), (Pollen From Tools), (Jelly Beans)" onclick="selectImage('index/hive_stickers/Hivesticker_standing_bean_bug.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_small_blue_chick.webp" alt="Small Blue Chick" data-tags="(Mobs), (Blue Pollen), (Blue Extracts)" onclick="selectImage('index/hive_stickers/Hivesticker_small_blue_chick.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_tadpole.webp" alt="Tadpole" data-tags="(Bubble Pollen), (Blue Extracts)" onclick="selectImage('index/hive_stickers/Hivesticker_tadpole.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_happy_fish.webp" alt="Happy Fish" data-tags="(Bubble Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_happy_fish.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_coiled_snake.webp" alt="Coiled Snake" data-tags=" (Epic Bee Attack), (Stingers)" onclick="selectImage('index/hive_stickers/Hivesticker_coiled_snake.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_standing_caterpillar.webp" alt="Standing Caterpillar" data-tags="(Rare Bee Pollen), (Enzymes)" onclick="selectImage('index/hive_stickers/Hivesticker_standing_caterpillar.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_round_green_critter.webp" alt="Round Green Critter" data-tags="(Bee Gathering Pollen), (Magic Beans)" onclick="selectImage('index/hive_stickers/Hivesticker_round_green_critter.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_flying_magenta_critter.webp" alt="Flying Magenta Critter" data-tags="(Bee Gathering Pollen), (Magic Beans)" onclick="selectImage('index/hive_stickers/Hivesticker_flying_magenta_critter.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_blue_triangle_critter.webp" alt="Blue Triangle Critter" data-tags="(Bee Gathering Pollen), (Magic Beans)" onclick="selectImage('index/hive_stickers/Hivesticker_blue_triangle_critter.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_purple_pointed_critter.webp" alt="Purple Pointed Critter" data-tags="(Bee Gathering Pollen), (Magic Beans)" onclick="selectImage('index/hive_stickers/Hivesticker_purple_pointed_critter.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_orange_leg_critter.webp" alt="Orange Leg Critter" data-tags="(Bee Gathering Pollen), (Magic Beans)" onclick="selectImage('index/hive_stickers/Hivesticker_orange_leg_critter.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_green_plus_sign.webp" alt="Green Plus Sign" data-tags="(Capacity), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_green_plus_sign.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_green_check_sign.webp" alt="Green Check Sign" data-tags="(Capacity), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_green_check_sign.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_red_x.webp" alt="Red X" data-tags="(Convert Rate), (Red Extracts)" onclick="selectImage('index/hive_stickers/Hivesticker_red_x.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_alert_icon.webp" alt="Alert Icon" data-tags="(Red Bomb Pollen), (Micro-Converters)" onclick="selectImage('index/hive_stickers/Hivesticker_alert_icon.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_yellow_right_arrow.webp" alt="Yellow Right Arrow" data-tags="(Instant Bee Gather Conversion), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_yellow_right_arrow.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_yellow_left_arrow.webp" alt="Yellow Left Arrow" data-tags="(Instant Bee Gather Conversion), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_yellow_left_arrow.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_simple_sun.webp" alt="Simple Sun" data-tags="(Convert Rate), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_simple_sun.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_pink_cupcake.webp" alt="Pink Cupcake" data-tags="(Honey Per Goo), (Strawberry)" onclick="selectImage('index/hive_stickers/Hivesticker_pink_cupcake.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_rubber_duck.webp" alt="Rubber Duck" data-tags="(Rare Bee Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_rubber_duck.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_baseball_swing.webp" alt="Baseball Swing" data-tags="(Pollen From Tools), (Jelly Beans)" onclick="selectImage('index/hive_stickers/Hivesticker_baseball_swing.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_yellow_coffee_mug.webp" alt="Yellow Coffee Mug" data-tags="(Convert Rate), (Oil)" onclick="selectImage('index/hive_stickers/Hivesticker_yellow_coffee_mug.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_launching_rocket.webp" alt="Launching Rocket" data-tags="(Capacity), (Whirligigs)" onclick="selectImage('index/hive_stickers/Hivesticker_launching_rocket.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_thumbs_up_hand.webp" alt="Thumbs Up Hand" data-tags="(Capacity), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_thumbs_up_hand.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_peace_sign_hand.webp" alt="Peace Sign Hand" data-tags="(Convert Rate), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_peace_sign_hand.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_traffic_light.webp" alt="Traffic Light" data-tags="(Capacity), (Neonberry, Neonberries)" onclick="selectImage('index/hive_stickers/Hivesticker_traffic_light.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_window.webp" alt="Window" data-tags="(Honey At Hive), (Soft Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_window.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_simple_skyscraper.webp" alt="Simple Skyscraper" data-tags="(Honey At Hive), (Micro-Converters)" onclick="selectImage('index/hive_stickers/Hivesticker_simple_skyscraper.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_simple_mountain.webp" alt="Simple Mountain" data-tags="(Mountain Top Field Pollen), (Whirligigs)" onclick="selectImage('index/hive_stickers/Hivesticker_simple_mountain.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_pale_heart.webp" alt="Pale Heart" data-tags="(Bee Gathering Pollen), (Strawberry)" onclick="selectImage('index/hive_stickers/Hivesticker_pale_heart.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_colorful_buttons.webp" alt="Colorful Buttons" data-tags="(Convert Rate), (Jelly Beans)" onclick="selectImage('index/hive_stickers/Hivesticker_colorful_buttons.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_giraffe.webp" alt="Giraffe" data-tags="(Convert Rate), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_giraffe.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_silly_tongue.webp" alt="Silly Tongue" data-tags="(Honey From Tokens), (Gumdrops)" onclick="selectImage('index/hive_stickers/Hivesticker_silly_tongue.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_white_flag.webp" alt="White Flag" data-tags="(White Pollen), (Oil)" onclick="selectImage('index/hive_stickers/Hivesticker_white_flag.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_pyramid.webp" alt="Pyramid" data-tags="(Cactus Field Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_pyramid.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_tiny_house.webp" alt="Tiny House" data-tags="(Convert Rate At Hive), (Sunflower Seeds)" onclick="selectImage('index/hive_stickers/Hivesticker_tiny_house.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_tnt.webp" alt="TNT" data-tags="(Bomb Pollen), (Soft Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_tnt.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_wishbone.webp" alt="Wishbone" data-tags="(Critical Power), (Field Dice)" onclick="selectImage('index/hive_stickers/Hivesticker_wishbone.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_yellow_umbrella.webp" alt="Yellow Umbrella" data-tags="(Instant Rare Bee Conversion), (Cloud Vial)" onclick="selectImage('index/hive_stickers/Hivesticker_yellow_umbrella.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_red_palm_hand.webp" alt="Red Palm Hand" data-tags="(Red Pollen), (Hard Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_red_palm_hand.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_yellow_sticky_hand.webp" alt="Yellow Sticky Hand" data-tags="(Honey Per Goo), (Glue)" onclick="selectImage('index/hive_stickers/Hivesticker_yellow_sticky_hand.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_yellow_walking_wiggly_person.webp" alt="Yellow Walking Wiggly Person" data-tags="(Movement Collection Pollen), (Gumdrops)" onclick="selectImage('index/hive_stickers/Hivesticker_yellow_walking_wiggly_person.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_green_sell.webp" alt="Green Sell" data-tags="(Convert Rate At Hive), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_green_sell.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_yellow_hi.webp" alt="Yellow Hi" data-tags="(Convert Rate), (Enzymes)" onclick="selectImage('index/hive_stickers/Hivesticker_yellow_hi.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_afk.webp" alt="Afk" data-tags="(Convert Rate At Hive), (Red Extracts)" onclick="selectImage('index/hive_stickers/Hivesticker_afk.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_auryn.webp" alt="Auryn" data-tags="(Capacity), (Swirled Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_auryn.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_pink_chair.webp" alt="Pink Chair" data-tags="(Bee Ability Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_pink_chair.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_doodle_s.webp" alt="Doodle S" data-tags="(Capacity), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_doodle_s.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_triple_exclamation.webp" alt="Triple Exclamation" data-tags="(Critical Power), (Loaded Dice)" onclick="selectImage('index/hive_stickers/Hivesticker_triple_exclamation.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_eighth_note.webp" alt="Eighth Note" data-tags="(Critical Power), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_eighth_note.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_eviction.webp" alt="Eviction" data-tags="(Capacity), (Hard Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_eviction.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_fork_and_knife.webp" alt="Fork And Knife" data-tags="(White Field Capacity), (Treats)" onclick="selectImage('index/hive_stickers/Hivesticker_fork_and_knife.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_shining_halo.webp" alt="Shining Halo" data-tags="(Pollen), (Glitters)" onclick="selectImage('index/hive_stickers/Hivesticker_shining_halo.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_rhubarb.webp" alt="Rhubarb" data-tags="(Bee Gathering Pollen), (Pinneaples)" onclick="selectImage('index/hive_stickers/Hivesticker_rhubarb.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_sprout.webp" alt="Sprout" data-tags="(Capacity), (Magic Beanss)" onclick="selectImage('index/hive_stickers/Hivesticker_sprout.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_palm_tree.webp" alt="Palm Tree" data-tags="(Coconut Field Pollen), (Coconuts)" onclick="selectImage('index/hive_stickers/Hivesticker_palm_tree.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_jack-o-lantern.webp" alt="Jack-O-Lantern" data-tags="(Pumpkin Patch Capacity), (Soft Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_jack-o-lantern.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_lightning.webp" alt="Lightning" data-tags="(Tool Swing Speed), (Micro-Converters)" onclick="selectImage('index/hive_stickers/Hivesticker_lightning.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_simple_cloud.webp" alt="Simple Cloud" data-tags="(White Pollen), (Cloud Vials)" onclick="selectImage('index/hive_stickers/Hivesticker_simple_cloud.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_grey_raining_cloud.webp" alt="Grey Raining Cloud" data-tags="(Blue Pollen), (Cloud Vials)" onclick="selectImage('index/hive_stickers/Hivesticker_grey_raining_cloud.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_tornado.webp" alt="Tornado" data-tags="(Tornado Pollen), (Cloud Vials)" onclick="selectImage('index/hive_stickers/Hivesticker_tornado.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_small_flame.webp" alt="Small Flame" data-tags="(Flame Pollen), (Red Extracts)" onclick="selectImage('index/hive_stickers/Hivesticker_small_flame.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_dark_flame.webp" alt="Dark Flame" data-tags="(Flame Pollen), (Stingers)" onclick="selectImage('index/hive_stickers/Hivesticker_dark_flame.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_small_shield.webp" alt="Small Shield" data-tags="(Dodge Chance), (Hard Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_small_shield.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_robot_head.webp" alt="Robot Head" data-tags="(Duped Ability Pollen), (Robo Pass)" onclick="selectImage('index/hive_stickers/Hivesticker_robot_head.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_cyan_hilted_sword.webp" alt="Cyan Hilted Sword" data-tags="(Bee Attack), (Stingers)" onclick="selectImage('index/hive_stickers/Hivesticker_cyan_hilted_sword.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_cool_backpack.webp" alt="Cool Backpack" data-tags="(Capacity), (Blue Extracts)" onclick="selectImage('index/hive_stickers/Hivesticker_cool_backpack.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_standing_beekeeper.webp" alt="Standing Beekeeper" data-tags="(White Pollen), (Oil)" onclick="selectImage('index/hive_stickers/Hivesticker_standing_beekeeper.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_red_wailing_cry.webp" alt="Red Wailling Cry" data-tags="(Instant Red Bee Conversion), (Stingers)" onclick="selectImage('index/hive_stickers/Hivesticker_red_wailing_cry.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_hourglass.webp" alt="Hourglass" data-tags="(Capacity), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_hourglass.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_atom_symbol.webp" alt="Atom Symbol" data-tags="(Instant Bomb Conversion), (Neonberry, Neonberries)" onclick="selectImage('index/hive_stickers/Hivesticker_atom_symbol.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_barcode.webp" alt="Barcode" data-tags="(Convert Rate), (Soft Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_barcode.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_wall_crack.webp" alt="Wall Crack" data-tags="(Colorless Bee Convert Rate), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_wall_crack.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_green_circle.webp" alt="Green Circle" data-tags="(Critical Power), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_green_circle.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_blue_square.webp" alt="Blue Square" data-tags="(Critical Power), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_blue_square.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_black_diamond.webp" alt="Black Diamond" data-tags="(Critical Power), (Caustic Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_black_diamond.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_waxing_crescent_moon.webp" alt="Waxing Crescent Moon" data-tags="(Capacity), (Moon Charmss)" onclick="selectImage('index/hive_stickers/Hivesticker_waxing_crescent_moon.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_glowing_smile.webp" alt="Glowing Smile" data-tags="(Capacity), (Glitters)" onclick="selectImage('index/hive_stickers/Hivesticker_glowing_smile.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_saturn.webp" alt="Saturn" data-tags="(Mark Ability Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_saturn.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_black_star.webp" alt="Black Star" data-tags="(Bomb Pollen), (Black Balloons)" onclick="selectImage('index/hive_stickers/Hivesticker_black_star.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_cyan_star.webp" alt="Cyan Star" data-tags="(Instant Gifted Bee Conversion), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_cyan_star.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_shining_star.webp" alt="Shining Star" data-tags="(Gifted Bee Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_shining_star.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_grey_diamond_logo.webp" alt="Grey Diamond Logo" data-tags="(Event Bee Pollen), (Micro-Converters)" onclick="selectImage('index/hive_stickers/Hivesticker_grey_diamond_logo.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_orphan_dog.webp" alt="Orphan Dog" data-tags="(Bee Gathering Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_orphan_dog.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_pizza_delivery_man.webp" alt="Pizza Delivery Man" data-tags="(Red Bee Convert Rate), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_pizza_delivery_man.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_interrobang_block.webp" alt="Interrobang Block" data-tags="(Critical Power), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_interrobang_block.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_theatrical_intruder.webp" alt="Theatrical Intruder" data-tags="(Bee Attack), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_theatrical_intruder.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_desperate_booth.webp" alt="Desperate Booth" data-tags="(Honey From Tokens), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_desperate_booth.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_built_ship.webp" alt="Built Ship" data-tags="(Blue Field Capacity), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_built_ship.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_grey_shape_companion.webp" alt="Grey Shape Companion" data-tags="(Honey From Token), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_grey_shape_companion.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_evil_pig.webp" alt="Evil Pig" data-tags="(Epic Bee Attack), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_evil_pig.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_waving_townsperson.webp" alt="Waving Townsperson" data-tags="(Blue Bee Convert Rate), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_waving_townsperson.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_cop_and_robber.webp" alt="Cop And Robber" data-tags="(Blue Bee Attack), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_cop_and_robber.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_tough_potato.webp" alt="Tough Potato" data-tags="(Bee Attack), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_tough_potato.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_young_elf.webp" alt="Young Elf" data-tags="(Ungifted Bee Pollen), (Paper Planters)" onclick="selectImage('index/hive_stickers/Hivesticker_young_elf.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_shrugging_heart.webp" alt="Shrugging Heart" data-tags="(Red Pollen), (Red Extracts)" onclick="selectImage('index/hive_stickers/Hivesticker_shrugging_heart.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_classic_killroy.webp" alt="Classic Killroy" data-tags="(White Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_classic_killroy.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_killroy_with_hair.webp" alt="Killroy With Hair" data-tags="(Convert Rate), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_killroy_with_hair.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_taunting_doodle_person.webp" alt="Taunting Doodle Person" data-tags="(Critical Power), (Enzymes)" onclick="selectImage('index/hive_stickers/Hivesticker_taunting_doodle_person.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_prehistoric_hand.webp" alt="Prehistoric Hand" data-tags="(Convert Rate), (Hard Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_prehistoric_hand.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_prehistoric_boar.webp" alt="Prehistoric Boar" data-tags="(Capacity), (Hard Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_prehistoric_boar.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_red_doodle_person.webp" alt="Red Doodle Person" data-tags="(Red Field Capacity), (Red Extracts)" onclick="selectImage('index/hive_stickers/Hivesticker_red_doodle_person.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_pearl_girl.webp" alt="Pearl Girl" data-tags="(White Field Capacity), (Swirled Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_pearl_girl.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_abstract_color_painting.webp" alt="Abstract Color Painting" data-tags="(Capacity), (Purple Potion)" onclick="selectImage('index/hive_stickers/Hivesticker_abstract_color_painting.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_prism_painting.webp" alt="Prism Painting" data-tags="(Legendary Bee Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_prism_painting.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_banana_painting.webp" alt="Banana Painting" data-tags="(Legendary Bee Pollen), (Purple Potion)" onclick="selectImage('index/hive_stickers/Hivesticker_banana_painting.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_moai.webp" alt="Moai" data-tags="(Capacity), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_moai.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_nessie.webp" alt="Nessie" data-tags="(Event Bee Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_nessie.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_ionic_column_top.webp" alt="Ionic Column Top" data-tags="(Capacity), (Hard Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_ionic_column_top.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_ionic_column_middle.webp" alt="Ionic Column Middle" data-tags="(Capacity), (Hard Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_ionic_column_middle.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_ionic_column_base.webp" alt="Ionic Column Base" data-tags="(Capacity), (Hard Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_ionic_column_base.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_orange_step_array.webp" alt="Orange Step Array" data-tags="(Convert Amount), (Enzymes)" onclick="selectImage('index/hive_stickers/Hivesticker_orange_step_array.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_orange_green_tri_deco.webp" alt="Orange Green Tri Deco" data-tags="(Convert Amount), (Enzymes)" onclick="selectImage('index/hive_stickers/Hivesticker_orange_green_tri_deco.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_orange_swirled_marble.webp" alt="Orange Swirled Marble" data-tags="(Flame Pollen), (Smooth Dices)" onclick="selectImage('index/hive_stickers/Hivesticker_orange_swirled_marble.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_blue_and_green_marble.webp" alt="Blue and Green Marble" data-tags="(Blue Pollen), (Smooth Dices)" onclick="selectImage('index/hive_stickers/Hivesticker_blue_and_green_marble.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_yellow_swirled_marble.webp" alt="Yellow Swirled Marble" data-tags="(Honey Per Pollen), (Smooth Dices)" onclick="selectImage('index/hive_stickers/Hivesticker_yellow_swirled_marble.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_diamond_cluster.webp" alt="Diamond Cluster" data-tags="(Convert Rate), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_diamond_cluster.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_diamond_trim.webp" alt="Diamond Trim" data-tags="(Honey Per Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_diamond_trim.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_cyan_decorative_border.webp" alt="Cyan Decorative Border" data-tags="(Honey Per Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_cyan_decorative_border.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_left_gold_swirl_fleuron.webp" alt="Left Gold Swirl Fleuron" data-tags="(Honey Per Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_left_gold_swirl_fleuron.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_right_gold_swirl_fleuron.webp" alt="Right Gold Swirl Fleuron" data-tags="(Honey Per Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_right_gold_swirl_fleuron.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_left_shining_diamond_fleuron.webp" alt="Left Shining Diamond Fleuron" data-tags="(Honey Per Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_left_shining_diamond_fleuron.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_right_shining_diamond_fleuron.webp" alt="Right Shining Diamond Fleuron" data-tags="(Honey Per Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_right_shining_diamond_fleuron.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_left_mythic_gem_fleuron.webp" alt="Left Mythic Gem Fleuron" data-tags="(Honey Per Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_left_mythic_gem_fleuron.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_right_mythic_gem_fleuron.webp" alt="Right Mythic Gem Fleuron" data-tags="(Honey Per Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_right_mythic_gem_fleuron.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_purple_fleuron.webp" alt="Purple Fleuron" data-tags="(Super Critical Power), (Purple Potion)" onclick="selectImage('index/hive_stickers/Hivesticker_purple_fleuron.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_royal_symbol.webp" alt="Royal Symbol" data-tags="(Super Critical Power), (Purple Potion)" onclick="selectImage('index/hive_stickers/Hivesticker_royal_symbol.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_royal_bear.webp" alt="Royal Bear" data-tags="(Super Critical Power), (Purple Potion)" onclick="selectImage('index/hive_stickers/Hivesticker_royal_bear.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_mythic_m.webp" alt="Mythic M" data-tags="(Mythic Bee Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_mythic_m.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_satisfying_nectar_icon.webp" alt="Satisfying Nectar Icon" data-tags="(White Pollen), (Satisfying Vials)" onclick="selectImage('index/hive_stickers/Hivesticker_satisfying_nectar_icon.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_refreshing_nectar_icon.webp" alt="Refreshing Nectar Icon" data-tags="(Unique Instant Conversion), (Refreshing Vials)" onclick="selectImage('index/hive_stickers/Hivesticker_refreshing_nectar_icon.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_motivating_nectar_icon.webp" alt="Motivating Nectar Icon" data-tags="(Bee Ability Rate), (Motivating Vials)" onclick="selectImage('index/hive_stickers/Hivesticker_motivating_nectar_icon.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_invigorating_nectar_icon.webp" alt="Invigorating Nectar Icon" data-tags="(Red Pollen), (Invigorating Vials)" onclick="selectImage('index/hive_stickers/Hivesticker_invigorating_nectar_icon.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_comforting_nectar_icon.webp" alt="Comforting Nectar Icon" data-tags="(Blue Pollen), (Comforting Vials)" onclick="selectImage('index/hive_stickers/Hivesticker_comforting_nectar_icon.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_small_tickseed.webp" alt="Small Tickseed" data-tags="(Sunflower Field Pollen), (Honeysuckles)" onclick="selectImage('index/hive_stickers/Hivesticker_small_tickseed.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_small_white_daisy.webp" alt="Small White Daisy" data-tags="(White Pollen), (Honeysuckles)" onclick="selectImage('index/hive_stickers/Hivesticker_small_white_daisy.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_small_pink_tulip.webp" alt="Small Pink Tulip" data-tags="(Mushroom Field Pollen), (Honeysuckles)" onclick="selectImage('index/hive_stickers/Hivesticker_small_pink_tulip.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_small_dandelion.webp" alt="Small Dandelion" data-tags="(Dandelion Field Pollen), (Honeysuckles)" onclick="selectImage('index/hive_stickers/Hivesticker_small_dandelion.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_purple_4-point_flower.webp" alt="Purple 4-Point Flower" data-tags="(Super Critical Power), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_purple_4-point_flower.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_spore_covered_puffshroom.webp" alt="Spore Covered Puffshroom" data-tags="(Pollen From Tools), (Soft Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_spore_covered_puffshroom.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_white_button_mushroom.webp" alt="White Button Mushroom" data-tags="(Common Bee Pollen), (Soft Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_white_button_mushroom.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_fly_agaric_mushroom.webp" alt="Fly Agaric Mushroom" data-tags="(Rare Bee Pollen), (Soft Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_fly_agaric_mushroom.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_porcini_mushroom.webp" alt="Porcini Mushroom" data-tags="(Epic Bee Pollen), (Soft Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_porcini_mushroom.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_oiler_mushroom.webp" alt="Oiler Mushroom" data-tags="(Epic Bee Pollen), (Soft Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_oiler_mushroom.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_morel_mushroom.webp" alt="Morel Mushroom" data-tags="(Rare Bee Pollen), (Soft Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_morel_mushroom.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_chanterelle_mushroom.webp" alt="Chanterelle Mushroom" data-tags="(Epic Bee Pollen), (Soft Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_chanterelle_mushroom.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_shiitake_mushroom.webp" alt="Shiitake Mushroom" data-tags="(Event Bee Pollen), (Hard Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_shiitake_mushroom.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_black_truffle_mushroom.webp" alt="Black Truffle Mushroom" data-tags="(Legendary Bee Pollen), (Hard Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_black_truffle_mushroom.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_prismatic_mushroom.webp" alt="Prismatic Mushroom" data-tags="(Mythic Bee Pollen), (Caustic Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_prismatic_mushroom.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_blowing_leaf.webp" alt="Blowing Leaf" data-tags="(Capacity), (Cloud Vials)" onclick="selectImage('index/hive_stickers/Hivesticker_blowing_leaf.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_cordate_leaf.webp" alt="Cordate Leaf" data-tags="(Capacity), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_cordate_leaf.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_cunate_leaf.webp" alt="Cunate Leaf" data-tags="(White Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_cunate_leaf.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_elliptic_leaf.webp" alt="Elliptic Leaf" data-tags="(Capacity), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_elliptic_leaf.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_hastate_leaf.webp" alt="Hastate Leaf" data-tags="(Capacity), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_hastate_leaf.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_lanceolate_leaf.webp" alt="Lanceolate Leaf" data-tags="(Capacity), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_lanceolate_leaf.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_lyrate_leaf.webp" alt="Lyrate Leaf" data-tags="(Capacity), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_lyrate_leaf.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_oblique_leaf.webp" alt="Oblique Leaf" data-tags="(Capacity), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_oblique_leaf.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_reniform_leaf.png" alt="Reniform Leaf" data-tags="(Capacity), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_reniform_leaf.png', alt)">
                        <img src="index/hive_stickers/Hivesticker_rhomboid_leaf.webp" alt="Rhomboid Leaf" data-tags="(Capacity), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_rhomboid_leaf.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_spatulate_leaf.webp" alt="Spatulate Leaf" data-tags="(Capacity), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_spatulate_leaf.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_scooper.webp" alt="Scooper" data-tags="(Pollen From Tools), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_scooper.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_rake.webp" alt="Rake" data-tags="(Pollen From Tools), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_rake.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_clippers.webp" alt="Clippers" data-tags="(Pollen From Tools), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_clippers.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_magnet.webp" alt="Magnet" data-tags="(Pollen From Tools), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_magnet.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_vacuum.webp" alt="Vacuum" data-tags="(Pollen From Tools), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_vacuum.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_super-scooper.webp" alt="Super-Scooper" data-tags="(Pollen From Tools), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_super-scooper.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_pulsar.webp" alt="Pulsar" data-tags="(Pollen From Tools), (Neonberry, Neonberries)" onclick="selectImage('index/hive_stickers/Hivesticker_pulsar.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_electro-magnet.webp" alt="Electro-Magnet" data-tags="(Pollen From Tools), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_electro-magnet.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_scissors.webp" alt="Scissors" data-tags="(Pollen From Tools), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_scissors.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_honey_dipper.webp" alt="Honey Dipper" data-tags="(Pollen From Tools), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_honey_dipper.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_bubble_wand.webp" alt="Bubble Wand" data-tags="(Pollen From Tools), (Blue Extracts)" onclick="selectImage('index/hive_stickers/Hivesticker_bubble_wand.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_scythe.webp" alt="Scythe" data-tags="(Pollen From Tools), (Red Extracts)" onclick="selectImage('index/hive_stickers/Hivesticker_scythe.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_golden_rake.webp" alt="Golden Rake" data-tags="(Pollen From Tools), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_golden_rake.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_spark_staff.webp" alt="Spark Staff" data-tags="(Pollen From Tools), (Micro-Converters)" onclick="selectImage('index/hive_stickers/Hivesticker_spark_staff.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_porcelain_dipper.webp" alt="Porcelain Dipper" data-tags="(Pollen From Tools), (Soft Waxes)" onclick="selectImage('index/hive_stickers/Hivesticker_porcelain_dipper.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_petal_wand.webp" alt="Petal Wand" data-tags="(Pollen From Tools), (Moon Charmss)" onclick="selectImage('index/hive_stickers/Hivesticker_petal_wand.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_tide_popper.webp" alt="Tide Popper" data-tags="(Pollen From Tools), (Blue Extracts)" onclick="selectImage('index/hive_stickers/Hivesticker_tide_popper.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_dark_scythe.webp" alt="Dark Scythe" data-tags="(Pollen From Tools), (Red Extracts)" onclick="selectImage('index/hive_stickers/Hivesticker_dark_scythe.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_gummyballer.webp" alt="Gummyballer" data-tags="(Pollen From Tools), (Gumdrops)" onclick="selectImage('index/hive_stickers/Hivesticker_gummyballer.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_capricorn_star_sign.webp" alt="Capricorn Star Sign" data-tags="(Capacity), (Glitters)" onclick="selectImage('index/hive_stickers/Hivesticker_capricorn_star_sign.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_aquarius_star_sign.webp" alt="Aquarius Star Sign" data-tags="(Capacity), (Glitters)" onclick="selectImage('index/hive_stickers/Hivesticker_aquarius_star_sign.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_pisces_star_sign.webp" alt="Picses Star Sign" data-tags="(Capacity), (Glitters)" onclick="selectImage('index/hive_stickers/Hivesticker_pisces_star_sign.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_aries_star_sign.webp" alt="Aries Star Sign" data-tags="(Capacity), (Glitters)" onclick="selectImage('index/hive_stickers/Hivesticker_aries_star_sign.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_taurus_star_sign.webp" alt="Taurus Star Sign" data-tags="(Capacity), (Glitters)" onclick="selectImage('index/hive_stickers/Hivesticker_taurus_star_sign.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_gemini_star_sign.webp" alt="Gemini Star Sign" data-tags="(Capacity), (Glitters)" onclick="selectImage('index/hive_stickers/Hivesticker_gemini_star_sign.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_cancer_star_sign.webp" alt="Cancer Star Sign" data-tags="(Capacity), (Glitters)" onclick="selectImage('index/hive_stickers/Hivesticker_cancer_star_sign.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_leo_star_sign.webp" alt="Leo Star Sign" data-tags="(Capacity), (Glitters)" onclick="selectImage('index/hive_stickers/Hivesticker_leo_star_sign.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_virgo_star_sign.webp" alt="Virgo Star Sign" data-tags="(Capacity), (Glitters)" onclick="selectImage('index/hive_stickers/Hivesticker_virgo_star_sign.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_libra_star_sign.webp" alt="Libra Star Sign" data-tags="(Capacity), (Glitters)" onclick="selectImage('index/hive_stickers/Hivesticker_libra_star_sign.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_scorpio_star_sign.webp" alt="Scorpio Star Sign" data-tags="(Capacity), (Glitters)" onclick="selectImage('index/hive_stickers/Hivesticker_scorpio_star_sign.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_sagittarius_star_sign.webp" alt="Sagittarius Star Sign" data-tags="(Capacity), (Glitters)" onclick="selectImage('index/hive_stickers/Hivesticker_sagittarius_star_sign.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_sunflower_field_stamp.webp" alt="Sunflower Field Stamp" data-tags="(Stamps), (Sunflower Field Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_sunflower_field_stamp.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_dandelion_field_stamp.webp" alt="Dandelion Field Stamp" data-tags="(Stamps), (Dandelion Field Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_dandelion_field_stamp.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_mushroom_field_stamp.webp" alt="Mushroom Field Stamp" data-tags="(Stamps), (Mushroom Field Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_mushroom_field_stamp.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_blue_flower_field_stamp.webp" alt="Blue Flower Field Stamp" data-tags="(Stamps), (Blue Flower Field Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_blue_flower_field_stamp.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_clover_field_stamp.webp" alt="Clover Field Stamp" data-tags="(Stamps), (Clover Field Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_clover_field_stamp.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_strawberry_field_stamp.webp" alt="Strawberry Field Stamp" data-tags="(Stamps), (Strawberry Field Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_strawberry_field_stamp.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_spider_field_stamp.webp" alt="Spider Field Stamp" data-tags="(Stamps), (Spider Field Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_spider_field_stamp.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_bamboo_field_stamp.webp" alt="Bamboo Field Stamp" data-tags="(Stamps), (Bamboo Field Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_bamboo_field_stamp.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_pineapple_patch_stamp.webp" alt="Pineapple Patch Field Stamp" data-tags="(Stamps), (Pineapple Patch Field Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_pineapple_patch_stamp.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_stump_field_stamp.webp" alt="Stump Field Stamp" data-tags="(Stamps), (Stump Field Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_stump_field_stamp.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_cactus_field_stamp.webp" alt="Cactus Field Stamp" data-tags="(Stamps), (Cactus Field Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_cactus_field_stamp.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_pumpkin_patch_stamp.webp" alt="Pumpkin Patch Field Stamp" data-tags="(Stamps), (Pumpkin Patch Field Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_pumpkin_patch_stamp.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_pine_tree_forest_stamp.webp" alt="Pine Tree Field Stamp" data-tags="(Stamps), (Pine Tree Field Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_pine_tree_forest_stamp.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_rose_field_stamp.webp" alt="Rose Field Stamp" data-tags="(Rose Field Pollen), (Stamps), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_rose_field_stamp.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_hub_field_stamp.webp" alt="Hub Field Stamp" data-tags="(Hub Field Pollen), (Stamps), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_hub_field_stamp.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_mountain_top_field_stamp.webp" alt="Mountain Top Field Stamp" data-tags="(Stamps), (Mountain Top Field Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_mountain_top_field_stamp.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_pepper_patch_stamp.webp" alt="Pepper Patch Field Stamp" data-tags="(Stamps), (Pepper Patch Field Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_pepper_patch_stamp.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_coconut_field_stamp.webp" alt="Coconut Field Stamp" data-tags="(Stamps), (Coconut Field Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_coconut_field_stamp.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_ant_field_stamp.webp" alt="Ant Field Stamp" data-tags="(Bee Attack), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_ant_field_stamp.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_green_beesmas_light.webp" alt="Green Beesmas Light" data-tags="(Beesmas),  (Critical Power), (Neonberry, Neonberries)" onclick="selectImage('index/hive_stickers/Hivesticker_green_beesmas_light.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_blue_beesmas_light.webp" alt="Blue Beesmas Light" data-tags="(Beesmas), (Blue Pollen), (Neonberry, Neonberries)" onclick="selectImage('index/hive_stickers/Hivesticker_blue_beesmas_light.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_red_beesmas_light.webp" alt="Red Beesmas Light" data-tags="(Beesmas),  (Red Pollen), (Neonberry, Neonberries)" onclick="selectImage('index/hive_stickers/Hivesticker_red_beesmas_light.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_yellow_beesmas_light.webp" alt="Yellow Beesmas Light" data-tags="(Beesmas), (Convert Rate), (Neonberry, Neonberries)" onclick="selectImage('index/hive_stickers/Hivesticker_yellow_beesmas_light.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_critter_in_a_stocking.webp" alt="Critter In A Stocking" data-tags="(Beesmas), (Bee Gathering Pollen), (Magic Beans)" onclick="selectImage('index/hive_stickers/Hivesticker_critter_in_a_stocking.webp', alt)">
                        <img src="index/hive_stickers/flying_festive_bee.png" alt="Flying Festive Bee" data-tags="(Beesmas),  (Red Bee Convert Rate), (Red Extracts)" onclick="selectImage('index/hive_stickers/flying_festive_bee.png', alt)">
                        <img src="index/hive_stickers/Hivesticker_flying_bee_bear.webp" alt="Flying Bee Bear" data-tags="(Beesmas), (Event Bee Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_flying_bee_bear.webp', alt)">
                        <img src="index/hive_stickers/party_robot_bear.png" alt="Party Robot Bear" data-tags="(Beesmas), (Duped Ability Pollen), (Robo Pass)" onclick="selectImage('index/hive_stickers/party_robot_bear.png', alt)">
                        <img src="index/hive_stickers/Hivesticker_festive_pufferfish.webp" alt="Festive Pufferfish" data-tags="(Beesmas), (Bomb Pollen), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_festive_pufferfish.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_festive_pea.webp" alt="Festive Pea" data-tags="(Beesmas), (Bee Attack), (Magic Beans)" onclick="selectImage('index/hive_stickers/Hivesticker_festive_pea.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_BBM_from_above.webp" alt="BBM From Above" data-tags="(Beesmas), (Pollen), (Box-O-Frogs)" onclick="selectImage('index/hive_stickers/Hivesticker_BBM_from_above.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_gamer_chat_icon.webp" alt="Gamer Chat Icon" data-tags="(Capacity), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_gamer_chat_icon.webp', alt)">
                        <img src="index/hive_stickers/Hivesticker_play_button.webp" alt="Play Button" data-tags="(Capacity), (Tickets)" onclick="selectImage('index/hive_stickers/Hivesticker_play_button.webp', alt)">
                    </div>
                </div>
                <!-- Category 1 -->
                <div class="category">
                    <h3><img src="csscontentTV/cubcat_icon.png" alt="Cub Icon">Cub Skins<img src="csscontentTV/cubcat_icon.png" alt="Cub Icon"></h3>
                    <input type="text" placeholder="Search..." onkeyup="filterImages(this, 'category1')">
                    <div class="images" id="category1">
                        <img src="index/cub_skins/BrownCub.png" alt="Brown Cub" onclick="selectImage('index/cub_skins/BrownCub.png', alt)">
                        <img src="index/cub_skins/RoboCub.png" alt="Robot Cub" onclick="selectImage('index/cub_skins/RoboCub.png', alt)">
                        <img src="index/cub_skins/Stick_cub_thumbnail.png" alt="Stick Cub" onclick="selectImage('index/cub_skins/Stick_cub_thumbnail.png', alt)">
                        <img src="index/cub_skins/Star_cub_thumbnail.png" alt="Star Cub" onclick="selectImage('index/cub_skins/Star_cub_thumbnail.png', alt)">
                        <img src="index/cub_skins/NoobCub.png" alt="Noob Cub" onclick="selectImage('index/cub_skins/NoobCub.png', alt)">
                        <img src="index/cub_skins/BeeBearCub.png" alt="Bee Cub" onclick="selectImage('index/cub_skins/BeeBearCub.png', alt)">
                        <img src="index/cub_skins/Gingerbread_cub5.png" alt="Gingerbead Cub" onclick="selectImage('index/cub_skins/Gingerbread_cub5.png', alt)">
                        <img src="index/cub_skins/SnowCubBuddy.png" alt="Snow Cub" onclick="selectImage('index/cub_skins/SnowCubBuddy.png', alt)">
                        <img src="index/cub_skins/PeppermintRoboCub.png" alt="Peppermint Robo Cub" onclick="selectImage('index/cub_skins/PeppermintRoboCub.png', alt)">
                        <img src="index/cub_skins/doodle_cub.png" alt="Doodle Cub" onclick="selectImage('index/cub_skins/doodle_cub.png', alt)">
                    </div>
                </div>
                <!-- Category 2 -->
                <div class="category">
                    <h3><img src="csscontentTV/hivecat_icon.png" alt="Hive Icon">Hive Skins<img src="csscontentTV/hivecat_icon.png" alt="Hive Icon"></h3>
                    <input type="text" placeholder="Search..." onkeyup="filterImages(this, 'category2')">
                    <div class="images" id="category2">
                        <img src="index/hive_skins/Hive_model_basic_red.png" alt="Basic Red Hive" onclick="selectImage('index/hive_skins/Hive_model_basic_red.png', alt)">
                        <img src="index/hive_skins/Hive_model_basic_blue.png" alt="Basic Blue Hive" onclick="selectImage('index/hive_skins/Hive_model_basic_blue.png', alt)">
                        <img src="index/hive_skins/Hive_model_basic_pink.png" alt="Basic Pink Hive" onclick="selectImage('index/hive_skins/Hive_model_basic_pink.png', alt)">
                        <img src="index/hive_skins/Hive_model_basic_green.png" alt="Basic Green Hive" onclick="selectImage('index/hive_skins/Hive_model_basic_green.png', alt)">
                        <img src="index/hive_skins/Hive_model_basic_white.png" alt="Basic White Hive" onclick="selectImage('index/hive_skins/Hive_model_basic_white.png', alt)">
                        <img src="index/hive_skins/Hive_model_basic_black.png" alt="Basic Black Hive" onclick="selectImage('index/hive_skins/Hive_model_basic_black.png', alt)">
                        <img src="index/hive_skins/wavy_yellow_hive.webp" alt="Wavy Yellow Hive" onclick="selectImage('index/hive_skins/wavy_yellow_hive.webp', alt)">
                        <img src="index/hive_skins/wavy_cyan_hive.png" alt="Wavy Cyan Hive" onclick="selectImage('index/hive_skins/wavy_cyan_hive.png', alt)">
                        <img src="index/hive_skins/wavy_purple_hive.png" alt="Wavy Purple Hive" onclick="selectImage('index/hive_skins/wavy_purple_hive.png', alt)">
                        <img src="index/hive_skins/wavy_festive_hive.webp" alt="Wavy Festive Hive" onclick="selectImage('index/hive_skins/wavy_festive_hive.webp', alt)">
                        <img src="index/hive_skins/wavy_doodle_hive.webp" alt="Wavy Doodle Hive" onclick="selectImage('index/hive_skins/wavy_doodle_hive.webp', alt)">
                    </div>
                </div>
                <!-- Category 3 -->
                <div class="category">
                    <h3><img src="csscontentTV/vouchercat_icon.webp" alt="Voucher Icon">Vouchers<img src="csscontentTV/vouchercat_icon.webp" alt="Voucher Icon"></h3>
                    <input type="text" placeholder="Search for keywords in Names, Stack Boosts, Stack Rewards, Types(Tools, Stamps, Signs,...)" onkeyup="filterImages(this, 'category3')">
                    <div class="images" id="category3">
                        <img src="index/vouchers/Bear_Bee_Voucher.webp" alt="Bear Bee Voucher" onclick="selectImage('index/vouchers/Bear_Bee_Voucher.webp', alt)">
                        <img src="index/vouchers/X2_BeePollen_Voucher.webp" alt="X2 Bee Pollen Voucher" onclick="selectImage('index/vouchers/X2_BeePollen_Voucher.webp', alt)">
                        <img src="index/vouchers/X2_Honeypass_Voucher.webp" alt="X2 Honeypass Voucher" onclick="selectImage('index/vouchers/X2_Honeypass_Voucher.webp', alt)">
                        <img src="index/vouchers/Png-3.png" alt="Cub Buddy Voucher" onclick="selectImage('index/vouchers/Png-3.png', alt)">
                    </div>
                </div>
                <!-- Category  0-->
                    <div class="category">
                        <h3><img src="csscontentTV/icons_icon.webp" alt="Cub Icon">Other<img src="csscontentTV/icons_icon.webp" alt="Cub Icon"></h3>
                        <input type="text" placeholder="Search..." onkeyup="filterImages(this, 'category0')">
                        <div class="images" id="category0">
                            <img src="index/otheritems/mlficon.png" alt="Most Looking For (Blacklist)" onclick="selectImage('index/otheritems/mlficon.png', alt)">
                            <img src="index/otheritems/offersicon.png" alt="Offers (Blacklist)" onclick="selectImage('index/otheritems/offersicon.png', alt)">
                            <img src="index/otheritems/anyicon.png" alt="Any (Blacklist)" onclick="selectImage('index/otheritems/anyicon.png', alt)">
                            <img src="index/otheritems/demandicon.png" alt="Demand (Blacklist)" onclick="selectImage('index/otheritems/demandicon.png', alt)">
                            <img src="index/otheritems/raresicon.png" alt="Rares" onclick="selectImage('index/otheritems/raresicon.png', alt)">
                            <img src="index/otheritems/commonsicon.png" alt="Commons" onclick="selectImage('index/otheritems/commonsicon.png', alt)">
                            <img src="index/otheritems/upgradeicon.png" alt="Upgrade (Blacklist)" onclick="selectImage('index/otheritems/upgradeicon.png', alt)">
                            <img src="index/otheritems/downgradeicon.png" alt="Downgrade (Blacklist)" onclick="selectImage('index/otheritems/downgradeicon.png', alt)">
                            <img src="index/otheritems/adds.png" alt="Adds" onclick="selectImage('index/otheritems/adds.png', alt)">
                            <img src="index/otheritems/overpayicon.png" alt="Overpay (Blacklist)" onclick="selectImage('index/otheritems/overpayicon.png', alt)">
                            <img src="index/otheritems/cubsicon.png" alt="Cubs" onclick="selectImage('index/otheritems/cubsicon.png', alt)">
                            <img src="index/otheritems/limitedsicon.png" alt="Limiteds" onclick="selectImage('index/otheritems/limitedsicon.png', alt)">
                            <img src="index/otheritems/leaderboardicons.png" alt="Leaderboard" onclick="selectImage('index/otheritems/leaderboardicons.png', alt)">
                            <img src="index/otheritems/beesmasicon.png" alt="Beesmas" onclick="selectImage('index/otheritems/beesmasicon.png', alt)">
                            <img src="index/otheritems/hivesicon.png" alt="Hives" onclick="selectImage('index/otheritems/hivesicon.png', alt)">
                            <img src="index/otheritems/vouchersicon.png" alt="Vouchers" onclick="selectImage('index/otheritems/vouchersicon.png', alt)">
                            <img src="index/otheritems/beequipsicon.png" alt="Beequips" onclick="selectImage('index/otheritems/beequipsicon.png', alt)">
                            <img src="index/otheritems/beesicon.png" alt="Bees" onclick="selectImage('index/otheritems/beesicon.png', alt)">
                            <img src="index/otheritems/bearsicon.png" alt="Bears" onclick="selectImage('index/otheritems/bearsicon.png', alt)">
                            <img src="index/otheritems/mobsicon.png" alt="Mobs" onclick="selectImage('index/otheritems/mobsicon.png', alt)">
                            <img src="index/otheritems/nectarsicon.png" alt="Nectars" onclick="selectImage('index/otheritems/nectarsicon.png', alt)">
                            <img src="index/otheritems/puffsicon.png" alt="Puffshrooms" onclick="selectImage('index/otheritems/puffsicon.png', alt)">
                            <img src="index/otheritems/leafsicon.png" alt="Leafs" onclick="selectImage('index/otheritems/leafsicon.png', alt)">
                            <img src="index/otheritems/toolsicon.png" alt="Tools" onclick="selectImage('index/otheritems/toolsicon.png', alt)">
                            <img src="index/otheritems/1tool.png" alt="Tool" onclick="selectImage('index/otheritems/1tool.png', alt)">
                            <img src="index/otheritems/signsicon.png" alt="Signs" onclick="selectImage('index/otheritems/signsicon.png', alt)">
                            <img src="index/otheritems/1sign.png" alt="Sign" onclick="selectImage('index/otheritems/1sign.png', alt)">
                            <img src="index/otheritems/stampsicon.png" alt="Stamps" onclick="selectImage('index/otheritems/stampsicon.png', alt)">
                            <img src="index/otheritems/1stamp.png" alt="Stamp" onclick="selectImage('index/otheritems/1stamp.png', alt)">
                            <img src="index/otheritems/bluestickersicon.png" alt="Blue Stickers" onclick="selectImage('index/otheritems/bluestickersicon.png', alt)">
                            <img src="index/otheritems/redstickersicon.png" alt="Red Stickers" onclick="selectImage('index/otheritems/redstickersicon.png', alt)">
                            <img src="index/otheritems/whitestickersicon.png" alt="White Stickers" onclick="selectImage('index/otheritems/whitestickersicon.png', alt)">
                            <img src="index/otheritems/bluebeequipsicon.png" alt="Blue Beequips" onclick="selectImage('index/otheritems/bluebeequipsicon.png', alt)">
                            <img src="index/otheritems/redbeequipsicon.png" alt="Red Beequips" onclick="selectImage('index/otheritems/redbeequipsicon.png', alt)">
                            <img src="index/otheritems/whitebeequipsicon.png" alt="White Beequips" onclick="selectImage('index/otheritems/whitebeequipsicon.png', alt)">
                            <img src="index/otheritems/oricon.png" alt="Or (Blacklist)" onclick="selectImage('index/otheritems/oricon.png', alt)">
                            <img src="index/otheritems/customtexticon.png" alt="Add Text (Blacklist)" onclick="addTextItem(currentSection)">
                        </div>
                    </div>
                    <div class="category">
                        <h3><img src="csscontentTV/beequipcat_icon.webp" alt="Beequip Icon">Beequips<img src="csscontentTV/beequipcat_icon.webp" alt="Beequip Icon"></h3>
                        <input type="text" placeholder="Search by keywords (Beesmas) for exclusive beequips..." onkeyup="filterImages(this, 'category5')">
                        <div class="images" id="category5">
                            <!--img src="index/beequip_skins/veteran_medal.png" alt="Veteran Medal" onclick="openSecondaryModal('index/beequip_skins/veteran_medal.png', alt)"-->
                            <!--img src="index/beequip_skins/shuriken.png" alt="Shuriken" onclick="openSecondaryModal('index/beequip_skins/shuriken.png', alt)"-->
                            <!--img src="index/beequip_skins/shell_necklace.png" alt="Shell Necklace" onclick="openSecondaryModal('index/beequip_skins/shell_necklace.png', alt)"-->
                            <!--img src="index/beequip_skins/safety_cone.png" alt="Safety Cone" onclick="openSecondaryModal('index/beequip_skins/safety_cone.png', alt)"-->
                            <!--img src="index/beequip_skins/rubber_bracelet.png" alt="Rubber Bracelet" onclick="openSecondaryModal('index/beequip_skins/rubber_bracelet.png', alt)"-->
                            <!--img src="index/beequip_skins/round_spectacles.webp" alt="Round Spectacles" onclick="openSecondaryModal('index/beequip_skins/round_spectacles.webp', alt)"-->
                            <!--img src="index/beequip_skins/pink_bow.webp" alt="Pink Bow" onclick="openSecondaryModal('index/beequip_skins/pink_bow.webp', alt)"-->
                            <!--img src="index/beequip_skins/pan_lid.png" alt="Pan Lid" onclick="openSecondaryModal('index/beequip_skins/pan_lid.png', alt)"-->
                            <!--img src="index/beequip_skins/orange_flip_flop.png" alt="Orange Flip Flop" onclick="openSecondaryModal('index/beequip_skins/orange_flip_flop.png', alt)"-->
                            <!--img src="index/beequip_skins/monster_finger_puppet.webp" alt="Monster Finger Puppet" onclick="openSecondaryModal('index/beequip_skins/monster_finger_puppet.webp', alt)"-->
                            <!--img src="index/beequip_skins/heroic_helm.png" alt="Heroic Helm" onclick="openSecondaryModal('index/beequip_skins/heroic_helm.png', alt)"-->
                            <!--img src="index/beequip_skins/fidget_spinner.png" alt="Fidget Spinner" onclick="openSecondaryModal('index/beequip_skins/fidget_spinner.png', alt)"-->
                            <img src="index/beequip_skins/Thimble.png" alt="Thimbe" onclick="openSecondaryModal('index/beequip_skins/Thimble.png', alt)">
                            <img src="index/beequip_skins/Sweatband.png" alt="Sweatband" onclick="openSecondaryModal('index/beequip_skins/Sweatband.png', alt)">
                            <img src="index/beequip_skins/Bandage.png" alt="Bandage" onclick="openSecondaryModal('index/beequip_skins/Bandage.png', alt)">
                            <img src="index/beequip_skins/Thumbtack.png" alt="Thumbtack" onclick="openSecondaryModal('index/beequip_skins/Thumbtack.png', alt)">
                            <img src="index/beequip_skins/Camo_Bandana.png" alt="Camo Bandana" onclick="openSecondaryModal('index/beequip_skins/Camo_Bandana.png', alt)">
                            <img src="index/beequip_skins/Bottle_cap.png" alt="Bottle Cap" onclick="openSecondaryModal('index/beequip_skins/Bottle_cap.png', alt)">
                            <img src="index/beequip_skins/Kazoo.png" alt="Kazoo" onclick="openSecondaryModal('index/beequip_skins/Kazoo.png', alt)">
                            <img src="index/beequip_skins/SmileySticker.png" alt="Smiley Sticker" onclick="openSecondaryModal('index/beequip_skins/SmileySticker.png', alt)">
                            <img src="index/beequip_skins/Whistle.png" alt="Whistle" onclick="openSecondaryModal('index/beequip_skins/Whistle.png', alt)">
                            <img src="index/beequip_skins/CharmBracelet.png" alt="Charm Bracelet" onclick="openSecondaryModal('index/beequip_skins/CharmBracelet.png', alt)">
                            <img src="index/beequip_skins/Paperclip.png" alt="Paper Clip" onclick="openSecondaryModal('index/beequip_skins/Paperclip.png', alt)">
                            <img src="index/beequip_skins/Beret.png" alt="Beret" onclick="openSecondaryModal('index/beequip_skins/Beret.png', alt)">
                            <img src="index/beequip_skins/BangSnap.png" alt="Bang Snap" onclick="openSecondaryModal('index/beequip_skins/BangSnap.png', alt)">
                            <img src="index/beequip_skins/Bead_Lizard.png" alt="Bead Lizard" onclick="openSecondaryModal('index/beequip_skins/Bead_Lizard.png', alt)">
                            <img src="index/beequip_skins/PinkShades.png" alt="Pink Shades" onclick="openSecondaryModal('index/beequip_skins/PinkShades.png', alt)">
                            <img src="index/beequip_skins/Lei.png" alt="Lei" onclick="openSecondaryModal('index/beequip_skins/Lei.png', alt)">
                            <img src="index/beequip_skins/demon_talisman.png" alt="Demon Talisman" onclick="openSecondaryModal('index/beequip_skins/demon_talisman.png', alt)">
                            <img src="index/beequip_skins/camphor_lip_balm.png" alt="Camphor Lip Balm" onclick="openSecondaryModal('index/beequip_skins/camphor_lip_balm.png', alt)">
                            <img src="index/beequip_skins/autumn_sunhat.png" alt="Autumn Sun Hat" onclick="openSecondaryModal('index/beequip_skins/autumn_sunhat.png', alt)">
                            <img src="index/beequip_skins/rose_headband.webp" alt="Rose Headband" onclick="openSecondaryModal('index/beequip_skins/rose_headband.webp', alt)">
                            <img src="index/beequip_skins/pink_eraser.png" alt="Pink Eraser" onclick="openSecondaryModal('index/beequip_skins/pink_eraser.png', alt)">
                            <img src="index/beequip_skins/candy_ring.png" alt="Candy Ring" onclick="openSecondaryModal('index/beequip_skins/candy_ring.png', alt)">
                            <img src="index/beequip_skins/ElfCap.png" alt="Elf Cap (Beesmas)" onclick="openSecondaryModal('index/beequip_skins/ElfCap.png', alt)">
                            <img src="index/beequip_skins/SingleMitten.png" alt="Single Mitten (Beesmas)" onclick="openSecondaryModal('index/beequip_skins/SingleMitten.png', alt)">
                            <img src="index/beequip_skins/Warm_Scarf.png" alt="Warm Scarf (Beesmas)" onclick="openSecondaryModal('index/beequip_skins/Warm_Scarf.png', alt)">
                            <img src="index/beequip_skins/Peppermint_Antennas.png" alt="Peppermint Antennas (Beesmas)" onclick="openSecondaryModal('index/beequip_skins/Peppermint_Antennas.png', alt)">
                            <img src="index/beequip_skins/Beesmas_Top.png" alt="Beesmas Top (Beesmas)" onclick="openSecondaryModal('index/beequip_skins/Beesmas_Top.png', alt)">
                            <img src="index/beequip_skins/Pinecone.png" alt="Pinecone (Beesmas)" onclick="openSecondaryModal('index/beequip_skins/Pinecone.png', alt)">
                            <img src="index/beequip_skins/Icicles.png" alt="Icicles (Beesmas)" onclick="openSecondaryModal('index/beequip_skins/Icicles.png', alt)">
                            <img src="index/beequip_skins/Beesmas_Tree_Hat.png" alt="Beesmas Tree Hat (Beesmas)" onclick="openSecondaryModal('index/beequip_skins/Beesmas_Tree_Hat.png', alt)">
                            <img src="index/beequip_skins/Bubble_Light.png" alt="Bubble Light (Beesmas)" onclick="openSecondaryModal('index/beequip_skins/Bubble_Light.png', alt)">
                            <img src="index/beequip_skins/Snow_Tiara.png" alt="Snow Tiara (Beesmas)" onclick="openSecondaryModal('index/beequip_skins/Snow_Tiara.png', alt)">
                            <img src="index/beequip_skins/Snowglobe.png" alt="Snow Globe (Beesmas)" onclick="openSecondaryModal('index/beequip_skins/Snowglobe.png', alt)">
                            <img src="index/beequip_skins/Reindeer_Antlers.png" alt="Reindeer Antlers (Beesmas)" onclick="openSecondaryModal('index/beequip_skins/Reindeer_Antlers.png', alt)">
                            <img src="index/beequip_skins/Toy_Horn.png" alt="Toy Horn (Beesmas)" onclick="openSecondaryModal('index/beequip_skins/Toy_Horn.png', alt)">
                            <img src="index/beequip_skins/PaperAngel.png" alt="Paper Angel (Beesmas)" onclick="openSecondaryModal('index/beequip_skins/PaperAngel.png', alt)">
                            <img src="index/beequip_skins/ToyDrum.png" alt="Toy Drum (Beesmas)" onclick="openSecondaryModal('index/beequip_skins/ToyDrum.png', alt)">
                            <img src="index/beequip_skins/LumpOfCoal.png" alt="Lump Of Coal (Beesmas)" onclick="openSecondaryModal('index/beequip_skins/LumpOfCoal.png', alt)">
                            <img src="index/beequip_skins/Poinsettia.png" alt="Pointsettia (Beesmas)" onclick="openSecondaryModal('index/beequip_skins/Poinsettia.png', alt)">
                            <img src="index/beequip_skins/ElectricCandle.png" alt="Electric Candle (Beesmas)" onclick="openSecondaryModal('index/beequip_skins/ElectricCandle.png', alt)">
                            <img src="index/beequip_skins/Festive_Wreath.png" alt="Festive Wreath (Beesmas)" onclick="openSecondaryModal('index/beequip_skins/Festive_Wreath.png', alt)">
                        </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Secondary Modal -->
    <div id="attachImageModal" class="modal">
        <div class="modal-content2">
            <span class="close" onclick="closeAttachModal()">&times;</span>
            <h2><img src="csscontentTV/beequipcat_icon.webp" alt="Beequip Icon">Add Waxes and Abilities<img src="csscontentTV/beequipcat_icon.webp" alt="Beequip Icon"></h2>
            <div class="attach-images">
                <h3>Add Waxes</h3>
                <div class="images" id="attach-category">
                    <img src="index/waxes/SoftWax.webp" alt="Soft Wax" onclick="selectAttachImage('index/waxes/SoftWax.webp')">
                    <img src="index/waxes/HardWax.webp" alt="Hard Wax" onclick="selectAttachImage('index/waxes/HardWax.webp')">
                    <img src="index/waxes/CausticWax.webp" alt="Caustic Wax" onclick="selectAttachImage('index/waxes/CausticWax.webp')">
                    <img src="index/waxes/SwirledWax.webp" alt="Swirled Wax" onclick="selectAttachImage('index/waxes/SwirledWax.webp')">
                </div>
                <div class="attached-preview" id="attached-preview"></div>
            </div>
            <div class="attach-texts">
                <h3>Add Abilities</h3>
                <div>
                    <input type="text" id="greenText" placeholder="+Abilities">
                    <button onclick="attachText('green')">Add +Abilities</button>
                </div>
                <div>
                    <input type="text" id="redText" placeholder="-Abilities">
                    <button onclick="attachText('red')">Add -Abilities</button>
                </div>
                <div>
                    <input type="text" id="blackText" placeholder="Potential (★)">
                    <button onclick="attachText('black')">Add Potential (Number)</button>
                </div>
                <div>
                    <input type="text" id="yellowText" placeholder="Hive Bonuses">
                    <button onclick="attachText('yellow')">Add Hive Bonuses</button>
                </div>
                <div id="attached-text-preview"></div>
            </div>
            <button onclick="finalizeAttachment()">Add to Trade</button>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
